import { connectDB } from "./src/config/database.js";
import { PORT } from "./src/config/env.js";
import app from './src/app.js';
import http from 'http';
import { initializeContext } from "zod/v4/core";
import { initializeSocket } from "./src/config/socket.js";

const server = http.createServer(app);

const startServer = async () => {
    try{
        await connectDB();

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

startServer();
initializeSocket(server);