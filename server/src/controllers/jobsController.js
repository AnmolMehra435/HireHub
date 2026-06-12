import { getEmployerJobs, closeJobs, createJobs, updateJob } from "../services/jobServices.js";
import { createJobSchema, updateJobSchema } from "../validations/jobsValidation.js";

export const createJobController = async (req, res) => {

    const result = createJobSchema.safeParse(req.body);
    
        if(!result.success){
            return res.status(400).json({
                success: false,
                message: "Invalid Entry"
            })
        }

    const job = await createJobs(
        result.data,
        req.user.userId
    );

    return res.status(201).json({
        success: true,
        job
    })
}

export const getMyJobs = async (req, res) => {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const jobs = await getEmployerJobs(userId, page, limit);
    
    return res.status(200).json({
        success: true,
        jobs
    })
}

export const updateJobController = async (req,res)=> {
    const result = updateJobSchema.safeParse(req.body);
    
    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "Invalid Entry"
        })
    }

    const jobId = req.params.id;
    const employerId = req.user.userId;
    const updateData = result.data;

    const newJob = await updateJob(employerId, jobId, updateData);

    if(!newJob){
        return res.status(404).json({
            success: false,
            "message": "not found"
        })
    }

    return res.status(200).json({
        success: true,
        newJob
    })
}

export const closeJobController = async (req, res) => {
    const jobId = req.params.id;
    const employerId = req.user.userId;
    
    const closedJob = await closeJobs(employerId, jobId);

    if(!closedJob){
        return res.status(404).json({
            success: false,
            "message": "Not found"
        })
    }

    return res.status(200).json({
        success: true,
        closedJob
    })
}