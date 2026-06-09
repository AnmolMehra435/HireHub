import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ["candidate", "employer", "admin"],
        default: "candidate"
    },
    refreshTokens: {
        type: [String],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


userSchema.pre("save", async function (){
    if(!this.isModified("password")){
        return;
    }

    try{
        this.password = await bcrypt.hash(this.password, 12);
    }catch(error){
        console.error(error);
    }
})

export const User = mongoose.model(
    "User",
    userSchema
);