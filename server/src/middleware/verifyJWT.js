import { ACCESS_TOKEN_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken"


export const authenticate = (req, res, next) => {

    const authHeader =
        req.headers.authorization;

    if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const token =
        authHeader.split(" ")[1];

    try {

        const decoded =
            jwt.verify(
                token,
                ACCESS_TOKEN_SECRET
            );

        req.user = decoded;

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

    }
}