import { User } from "../models/users.js";
import { generateAccessToken,generateRefreshToken, removeRefreshToken, saveRefreshToken, verifyAndRotateRefreshToken } from "../services/authServices.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler( 
        async (req, res) => {
        const result = registerSchema.safeParse(req.body);

        if(!result.success){
            return sendError(res, 400, "Invalid user entry")
        }

        const name = result.data.name;
        const email = result.data.email;
        const password = result.data.password;

        const duplicateUser = await User.findOne({
            email: email
        });

        if(duplicateUser){
            return sendError(res, 409, "Email already registered")
        }

        const user = await User.create({
            name,
            email,
            password
        })

        const accessToken = generateAccessToken(user._id, user.role);

        const refreshToken = generateRefreshToken(user._id);

        await saveRefreshToken(user._id, refreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return sendSuccess(res, 201, "Registered Successfully", 
            { accessToken: accessToken, 
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
            })
    }
)


export const login = asyncHandler( 
    async (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if(!result.success){
        return sendError(res, 400, "Invalid Entry")
    }

    const email = result.data.email;
    const password = result.data.password;

    const user = await User.findOne({
        email
    }).select("+password")

    if(!user){
        return sendError(res, 401, "Unauthorized")
    }

    const match = await user.comparePassword(password);

    if(match){
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);

        await saveRefreshToken(user._id, refreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return sendSuccess(res, 200, "Login successful", {
            accessToken: accessToken,
            userData: {
                userId: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })

    }else{
        return sendError(res, 401, "Unauthorized")
    }
}
)

export const logout = asyncHandler(
    async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
        const user = await User.findOne({
            refreshTokens: refreshToken
        });

        if(user){
            await removeRefreshToken(user._id, refreshToken);
        }
    }

    res.clearCookie("refreshToken");

    return sendSuccess(res, 200, "Logout successful")
}
)


export const refresh = asyncHandler(
    async (req , res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return sendError(res, 401, "Unauthorized")
    }

    try{
        const newTokens = await verifyAndRotateRefreshToken(refreshToken);

        res.cookie("refreshToken", newTokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return sendSuccess(res, 200, "Refresh done", {
            accessToken: newTokens.accessToken
        })
        
    }catch(error){
        return sendError(res, 401, "Unauthorized")
    }
}
)