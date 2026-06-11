import { createJobs } from "../services/jobServices.js";

export const createJobController = async (req, res) => {
    const job = await createJobs(
        req.body,
        req.user.id
    )
}