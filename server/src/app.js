import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use("/api/jobs", jobsRouter)

app.use("/api/auth", authRouter)

app.get('/api/health', (req, res) => {
    res.json({
        "message": "server is running"
    })
})

export default app;