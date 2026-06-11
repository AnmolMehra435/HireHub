import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/env.js';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../config/env.js';
import { User } from '../models/users.js';
import jwt from "jsonwebtoken"

export const generateAccessToken = (userId, role) => {
    const token = jwt.sign(
        {
            userId: userId,
            role: role
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )

    return token;
}

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        {
            userId: userId
        },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}

export const saveRefreshToken = async (userId, refreshToken) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.refreshTokens.push(refreshToken);

    await user.save();
};

export const removeRefreshToken = async (userId, refreshToken) => {
    const user = await User.findById(userId)
    if(!user){
        throw new Error("User not found")
    }

    const newRefreshToken =  user.refreshTokens.filter(tokens => tokens !== refreshToken);

    user.refreshTokens = newRefreshToken;

    await user.save();
}

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