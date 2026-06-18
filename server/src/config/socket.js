import { Server } from "socket.io";
import { verifyJWTfunc } from "../services/jwt.js";

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.use((socket, next) => {

        const token = socket.handshake.auth.token;

        console.log("Received:", token);

        socket.user = {
            userId: "employer123",
            role: "employer"
        };

        next();
    });

    io.on("connection", (socket) => {

        socket.join(socket.user.userId);

        console.log(
            `Socket ${socket.id} joined room ${socket.user.userId}`
        );

    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }

    return io;
};