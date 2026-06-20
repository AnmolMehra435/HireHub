import rateLimit from 'express-rate-limit';
import { sendError } from '../utils/apiResponse.js';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        return sendError(res, 429, "Too many request")
    }
})