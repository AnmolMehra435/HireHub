import { getSingleJob, incrementApplicationCount } from "../services/jobServices.js";
import { applytoJobs } from "../services/applicationServices.js";

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