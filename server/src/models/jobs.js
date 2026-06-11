import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        enum: ["fresher", "1-2 years", "2-5 years", "5+ years"],
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["full-time", "part-time", "contract", "internship"]
    },
    salary: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    },
    skills: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "closed", "draft"],
        default: "open"
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    applicationCount: {
        type: Number,
        default: 0
    },
    deadline: Date
}, { timestamps: true });

jobSchema.index({
    status: 1,
    createdAt: -1
});

jobSchema.index({
    postedBy: 1,
    status: 1
});

jobSchema.index({
    title: "text",
    description: "text",
    skills: "text"
})

export const Job = mongoose.model("Job", jobSchema)