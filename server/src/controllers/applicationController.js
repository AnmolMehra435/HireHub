import { getSingleJob, incrementApplicationCount, verifyJob } from "../services/jobServices.js";
import { applytoJobs, getMyApplications, getJobApplicants, getOwnedApplication, updateApplication } from "../services/applicationServices.js";
import { User } from "../models/users.js";
import { sendApplicationConfirmation, sendNewApplicationAlert, sendApplicationStatusUpdate } from "../services/emailService.js";
import { notifyEmployer, notifyCandidate } from "../services/notification.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const applyJob = asyncHandler(async (req, res) => {
    const job = req.params.jobId;
    const user = req.user.userId;
    const resume = req.file?.path;
    const coverLetter = req.body.coverLetter;

    const existingJob = await getSingleJob(job);

    if(!existingJob){
        return sendError(res, 400, "Bad Request")
    };

    if(existingJob.status !== "open"){
        return sendError(res, 400, "Bad Request")
    };

    if(!resume){
        return sendError(res, 400, "Bad Request")
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

        return sendSuccess(res, 201, "Application created", {application})
    }catch(error){
        if(error.code === 11000){
            return sendError(res, 400, "You have already applied to this job")
        }

        throw error;
    }
})

export const myApplications = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const skip = (page - 1) * limit;

    const applications = await getMyApplications(userId, skip, limit);

    if(applications.length === 0){
        return sendError(res, 400, "Bad Request")
    }

    return sendSuccess(res, 200, "Fetched applications", {applications})
})

export const getJobApplications = asyncHandler(async (req, res) => {
    const jobId = req.params.jobId;
    const employerId = req.user.userId;

    const exists = await verifyJob(jobId, employerId);

    if(!exists){
        return sendError(res, 403, "Bad Request")
    };

    const applicants = await getJobApplicants(jobId);

    return sendSuccess(res, 200, "Fetched all applicants", {applicants})
})

export const updateApplicationStatus = asyncHandler(async (req, res) => {
    const applicationId = req.params.applicationId;
    const employerId = req.user.userId;
    const status = req.body.status;

    const application = await getOwnedApplication(applicationId, employerId);

    if(!application){
        return sendError(res, 404, "Not Found")
    }

    const jobTitle = application.job.title;
    const candidateEmail = application.candidate.email;

    const allowedStatus = ["pending", "shortlisted", "reviewed","rejected","selected"];

    if(!allowedStatus.includes(status)){
        return sendError(res, 400, "Not found")
    }

    const updatedApplication = await updateApplication(applicationId, status);

    notifyCandidate(application.candidate._id, applicationId, status);  

    sendApplicationStatusUpdate(
        candidateEmail,
        jobTitle,
        status
    );

    return sendSuccess(res, 200, "Application updated successfully", { updatedApplication })
})