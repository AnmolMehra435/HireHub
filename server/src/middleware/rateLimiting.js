import rateLimit from 'express-rate-limit';
import { sendError } from '../utils/apiResponse.js';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        return sendError(res, 429, "Too many request")
    }
})

export const jobLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    handler: (req, res) =>{
        return sendError(res, 429, "Too many requests")
    }
})

export const applyLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    handler: (req, res) =>{
        return sendError(res, 429, "Too many requests")
    }
})