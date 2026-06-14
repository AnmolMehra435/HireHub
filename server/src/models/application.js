import mongoose from 'mongoose';


const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    resumeUrl: {
        type: String,
        required: true
    },
    coverLetter: String,
    status: {
        type: String,
        enum: ["pending", "reviewing", "shortlisted", "rejected"],
        default: "pending"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })


export const Application = mongoose.model('Application', applicationSchema);