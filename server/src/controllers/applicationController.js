import { getSingleJob, incrementApplicationCount, verifyJob } from "../services/jobServices.js";
import { applytoJobs, getMyApplications, getJobApplicants, getOwnedApplication, updateApplication } from "../services/applicationServices.js";

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

export const updateApplicationStatus = async (Req, res) => {
    const applicationId = req.params.applicationId;
    const employerId = req.user.userId;
    const status = req.body.status;

    const application = await getOwnedApplication(applicationId, employerId)

    if(!application){
        return res.status(403).json({
            success: false,
            message: "Not found"
        })
    }

    const allowedStatus = ["pending", "shortlisted", "reviewing","rejected","selected"];

    if(!allowedStatus.includes(status)){
        return res.status(400).json({
            success: false,
            message: "Not found"
        })
    }

    await updateApplication(applicationId, status);

    return res.status(200).json({
        success: true,
        application
    });
}