import { Job } from "../models/jobs.js";

const allowedFields = [
    "title",
    "description",
    "location",
    "salary",
    "skills",
    "category",
    "deadline",
    "status"
]

export const createJobs = async (jobData, employerId) => {
    return await Job.create({
        ...jobData,
        postedBy: employerId
    });
}

export const getEmployerJobs = async (employerId, page, limit) => {
    const skipDoc = (page - 1) * limit;
    return await Job.find({
        postedBy: employerId
    }).sort({ createdAt: -1 }).skip(skipDoc).limit(limit);
}

export const updateJob = async (employerId, jobId, updateData) => {

    const safeUpdateData = {}

    for(const field of Object.keys(updateData)){
        if(allowedFields.includes(field)){
            safeUpdateData[field] = updateData[field];
        }
    }

    return await Job.findOneAndUpdate(
        {
            _id: jobId,
            postedBy: employerId
        },
        safeUpdateData,
        {
            new: true
        }
    )
};

export const closeJobs = async (employerId, jobId) => {
    return await Job.findOneAndUpdate(
        {
            _id: jobId,
            postedBy: employerId
        },
        {
            status: "closed"
        },
        {
            new: true
        }
    )
}