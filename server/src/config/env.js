import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
    "PORT",
    "NODE_ENV",
    "MONGODB_URI"
];

for(const variable of requiredEnvVars){
    if(!process.env[variable]){
        throw new Error(
            `Missing required environment variable: ${variable}`
        )
    }
}

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const MONGODB_URI = process.env.MONGODB_URI;