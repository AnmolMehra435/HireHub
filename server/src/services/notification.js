import { getIO } from "../config/socket.js";

export const notifyEmployer = (employerId, applicationId, jobId) => {

    const io = getIO();

    io.to(employerId).emit(
        "applicationRecieved",
        {
            message: "New application received",
            applicationId,
            jobId,
            timestamp: new Date()
        }
    );
};

export const notifyCandidate = (candidateId, applicationId, status) => {
    const io = getIO();

    io.to(candidateId).emit(
        "applicationUpdated",
        {
            message: "Your Application has been updated",
            applicationId,
            status,
            timestamp: new Date()
        }
    )
}