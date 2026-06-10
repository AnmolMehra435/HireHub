import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/env.js';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../config/env.js';
import { User } from '../models/users.js';

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