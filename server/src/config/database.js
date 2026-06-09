import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";

export const connectDB = async () =>{
    try{
        await mongoose.connect(MONGODB_URI);

        console.log("MongoDb Connected ...");
    }catch(error){
        console.log("MongoDb Connection failed...");
        console.log(error.message);

        process.exit(1);
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected");
} )

const gracefulShutdown = async (signal) => {
    try{
        await mongoose.connection.close();


        console.log(`MongoDb connection closed due to ${signal}`)
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

process.on("SIGINT", () => {
    gracefulShutdown("SIGINT");
})

process.on("SIGTERM", () => {
    gracefulShutdown("SIGTERM");
})