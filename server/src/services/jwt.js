import { ACCESS_TOKEN_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const verifyJWTfunc = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}