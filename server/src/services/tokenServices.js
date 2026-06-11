import { REFRESH_TOKEN_SECRET } from "../config/env.js";
import { User } from "../models/users.js";
import { generateAccessToken, generateRefreshToken } from "./authServices.js";
import jwt from "jsonwebtoken"

export const verifyAndRotateRefreshToken = async (refreshToken) => {
    let decoded;

    try{
        decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch {
        throw new Error("Invalid refresh token");
    }

    const user = await User.findById(decoded.userId);

    if(!user){
        throw new Error("User not found");
    }

    if(!user.refreshTokens.includes(refreshToken)){
        user.refreshTokens = [];
        await user.save();
        throw new Error("Token is invalid");
    }

    const newToken = user.refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);

    newToken.push(newRefreshToken);

    user.refreshTokens = newToken;

    await user.save();

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}