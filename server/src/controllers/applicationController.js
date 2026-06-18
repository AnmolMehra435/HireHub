import { getSingleJob, incrementApplicationCount, verifyJob } from "../services/jobServices.js";
import { applytoJobs, getMyApplications, getJobApplicants, getOwnedApplication, updateApplication } from "../services/applicationServices.js";
import { User } from "../models/users.js";
import { sendApplicationConfirmation, sendNewApplicationAlert, sendApplicationStatusUpdate } from "../services/emailService.js";
import { notifyEmployer, notifyCandidate } from "../services/notification.js";

export const applyJob = async (req, res) => {
    const job = req.params.jobId;
    const user = req.user.userId;
    const resume = req.file?.path;
    const coverLetter = req.body.coverLetter;

    const existingJob = await getSingleJob(job);

    if(!existingJob){
        return res.status(400).json({
            success: false,
            message: "Bad request"
        })
    };

    if(existingJob.status !== "open"){
        return res.status(400).json({
            success: false,
            message: "Bad request"
        })
    };

    if(!resume){
        return res.status(400).json({
            success: false,
            message: "Bad request"
        })
    }


    try{
        const application = await applytoJobs(job, user, resume, coverLetter);

        await incrementApplicationCount(job);

        const candidate = await User.findById(user).select("email name");
        const jobTitle = existingJob.title;
        const companyName = existingJob.company;
        const employerEmail = existingJob.postedBy.email
        const candidateEmail = candidate.email;
        const candidateName = candidate.name;

        notifyEmployer(
            existingJob.postedBy._id,
            application._id,
            job
        );

        sendApplicationConfirmation(
            candidateEmail,
            jobTitle,
            companyName
        );

        sendNewApplicationAlert(
            employerEmail,
            candidateName,
            jobTitle
        );

        return res.status(201).json({
            success: true,
            application
        })
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({
                success: false,
                message: "You have already applied to this job"
            })
        }

        throw error;
    }
}

export const myApplications = async (req, res) => {
    const userId = req.user.userId;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const skip = (page - 1) * limit;

    const applications = await getMyApplications(userId, skip, limit);

    if(applications.length === 0){
        return res.status(400).json({
            success: false,
            message: "Not found"
        })
    }

    return res.status(200).json({
        success: true,
        applications
    })
}

export const getJobApplications = async (req, res) => {
    const jobId = req.params.jobId;
    const employerId = req.user.userId;

    const exists = await verifyJob(jobId, employerId);

    if(!exists){
        return res.status(403).json({
            success: false,
            message: "Not found"
        })
    };

    const applicants = await getJobApplicants(jobId);

    return res.status(200).json({
        success: true,
        applicants
    })
}

export const updateApplicationStatus = async (req, res) => {
    const applicationId = req.params.applicationId;
    const employerId = req.user.userId;
    const status = req.body.status;

    const application = await getOwnedApplication(applicationId, employerId);

    if(!application){
        return res.status(403).json({
            success: false,
            message: "Not found"
        })
    }

    const jobTitle = application.job.title;
    const candidateEmail = application.candidate.email;

    const allowedStatus = ["pending", "shortlisted", "reviewed","rejected","selected"];

    if(!allowedStatus.includes(status)){
        return res.status(400).json({
            success: false,
            message: "Not found"
        })
    }

    await updateApplication(applicationId, status);

    notifyCandidate(application.candidate._id, applicationId, status);  

    sendApplicationStatusUpdate(
        candidateEmail,
        jobTitle,
        status
    );

    return res.status(200).json({
        success: true,
        application
    });
}