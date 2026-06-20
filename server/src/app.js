import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"
import applicationRouter from "./routes/applicationRoutes.js"
import { notifyEmployer } from "./services/notification.js";
import { FRONTEND_URL } from "./config/env.js";
import helmet from "helmet"
const app = express();

app.use(helmet())
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use("/api/jobs", jobsRouter)

app.use("/api/auth", authRouter)

app.use("/api/application", applicationRouter)

app.get('/api/health', (req, res) => {

    notifyEmployer("employer123", "app123", "job123");

    res.json({
        success: true,
        "message": "server is running"
    })
})

export default app;