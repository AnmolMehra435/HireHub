import { Application } from "../models/application.js";
import { Job } from "../models/jobs.js";

export const applytoJobs = (jobId, userId, resume, coverLetter) => {
    return Application.create({
        job: jobId,
        candidate: userId,
        resumeUrl: resume,
        coverLetter: coverLetter
    })
}

export const getMyApplications = (userId, skip, limit) => {
    return Application.find({ candidate: userId }).populate("job", "title company type location").sort({ appliedAt: -1 }).skip(skip).limit(limit);
}

export const getJobApplicants = (jobId) => {
    return Application.find({ job: jobId }).populate("candidate", "name email").sort({ appliedAt: -1 })
} 

export const getOwnedApplication = async (applicationId, employerId) => {
    const application = await Application.findOne({
        _id: applicationId,
    }).populate("job", "postedBy");

    if(!application){
        return null
    }

    if(application.job.postedBy.toString() !== employerId){
        return null;
    }

    return application
}

export const updateApplication = async(applicationId, status) => {
    const application = await Application.findById(applicationId);

    application.status = status;

    await application.save();

    return application;
}