import { getSingleJob } from "../services/jobServices.js";

export const applyJob = async (req, res) => {
    const job = req.params.jobId;
    const user = req.user.userId;
    const resume = req.file.path;
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

    const application = await applytoJobs(job, user, resume, coverLetter);

    return res.status(200).json({
        success: true,
        message: "Application submited"
    })

}