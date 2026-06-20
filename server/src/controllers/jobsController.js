import { Job } from "../models/jobs.js";
import { getEmployerJobs, closeJobs, createJobs, updateJob, getSingleJob, getJob, countJobs } from "../services/jobServices.js";
import { createJobSchema, updateJobSchema } from "../validations/jobsValidation.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createJobController = asyncHandler(async (req, res) => {

    const result = createJobSchema.safeParse(req.body);
    
        if(!result.success){
            return sendError(res, 400, "Invalid Entry")
        }

    const job = await createJobs(
        result.data,
        req.user.userId
    );

    return sendSuccess(res, 201, "Job created Succesfully", {job})
})

export const getMyJobs = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const jobs = await getEmployerJobs(userId, page, limit);
    
    return sendSuccess(res, 200, "Jobs fetched successfully", {jobs})
})

export const updateJobController = asyncHandler(async (req,res)=> {
    const result = updateJobSchema.safeParse(req.body);
    
    if(!result.success){
        return sendError(res, 400, "Invalid Entry")
    }

    const jobId = req.params.id;
    const employerId = req.user.userId;
    const updateData = result.data;

    const newJob = await updateJob(employerId, jobId, updateData);

    if(!newJob){
        return sendError(res, 404, "Not Found")
    }

    return sendSuccess(res, 200, "Job updated successfully", {newJob})
})

export const closeJobController = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const employerId = req.user.userId;
    
    const closedJob = await closeJobs(employerId, jobId);

    if(!closedJob){
        return sendError(res, 404, "Not Found")
    }

    return sendSuccess(res, 200, "Job closed", {closedJob})
})

export const getOneJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id;

    const job = await getSingleJob(jobId);

    if(!job || job.status !== "open" ){
        return sendError(res, 404, "Page not found")
    }

    return sendSuccess(res, 200, "fetched Job", {job})
})

export const getJobs = asyncHandler(async (req, res) => {

    const search = req.query.search;
    const location = req.query.location;
    const type = req.query.type;
    const experience = req.query.experience;
    const category = req.query.category
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query = {
        status: "open"
    }

    if(type){
        query.type = type;
    }

    if(experience){
        query.experience = experience;
    }

    if(category){
        query.category = category;
    }

    if(location){
        query.location = {
            $regex: location,
            $options: "i"
        }
    }

    if(search){
        query.$text = {
            $search: search
        }
    }

    const skip = (page - 1) * limit;

    const jobsPromise = getJob(query, skip, limit);
    const countPromise = countJobs(query);

    const [jobs, totalJobs] = await Promise.all([
        jobsPromise,
        countPromise
    ])

    const totalPages = Math.ceil(totalJobs/limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const pagination = {
        currentPage: page,
        totalPages,
        totalJobs,
        hasNextPage,
        hasPrevPage
    }

    return sendSuccess(res, 200, "Fetched jobs", {
        jobs, 
        pagination
    })
})


export const getStats = asyncHandler(
    async (req, res) => {

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7)

    const [stats] = await Job.aggregate([
        {
            $match: {
                status: "open"
            }
        },
        {
            $facet: {
                totalJobs: [
                    {
                        $count: "count"
                    }
                ],
                jobsByCategory: [
                    {
                        $group: {
                            _id: "$category",
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ],
                recentJobs: [
                    {
                        $match: {
                            createdAt: {
                                $gte: last7Days
                            }
                        }
                    },
                    {
                        $count: "count"
                    }
                ]
            }
        }
    ])
   
    return sendSuccess(res, 200, "Calculated stats", {
        stats: {
            totalJobs: stats.totalJobs[0]?.count || 0,
            jobsByCategory: stats.jobsByCategory,
            recentJobs: stats.recentJobs[0]?.count || 0
        }
    })
} 
)