import { Application } from "../models/application.js";

export const applytoJobs = (jobId, userId, resume, coverLetter) => {
    return Application.create({
        job: jobId,
        candidate: userId,
        resumeUrl: resume,
        coverLetter: coverLetter
    })
}