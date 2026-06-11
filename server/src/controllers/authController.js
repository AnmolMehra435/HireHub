import { User } from "../models/users.js";
import { generateAccessToken,generateRefreshToken, removeRefreshToken, saveRefreshToken, verifyAndRotateRefreshToken } from "../services/authServices.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";

export const register = async (req, res) => {
    const result = registerSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "Invalid user entry"
        })
    }

    const name = result.data.name;
    const email = result.data.email;
    const password = result.data.password;

    const duplicateUser = await User.findOne({
        email: email
    });

    if(duplicateUser){
        return res.status(409).json({
            success: false,
            message: "Email alreaty registered"
        })
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

    return res.status(201).json({
        success: true,
        accessToken: accessToken,
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    })
}


export const login = async (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "Invalid Entry"
        })
    }

    const email = result.data.email;
    const password = result.data.password;

    const user = await User.findOne({
        email
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message: "Unauthorized"
        })
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

        return res.status(200).json({
            success: true,
            accessToken: accessToken,
            userData: {
                userId: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    }else{
        return res.status(401).json({
            "message": "Unauthorized"
        })
    }
}

export const logout = async (req, res) => {
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

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}


export const refresh = async (req , res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try{
        const newTokens = await verifyAndRotateRefreshToken(refreshToken);

        res.cookie("refreshToken", newTokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            accessToken: newTokens.accessToken
        })
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}