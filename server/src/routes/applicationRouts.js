import express from "express";
import { applyJob, myApplications, getJobApplications, updateApplicationStatus } from "../controllers/applicationController.js";
import { authenticate } from "../middleware/verifyJWT.js";
import { verifyRole } from "../middleware/verifyRoles.js";
import { upload } from "../middleware/multer.js"

const router = express.Router();

router.post("/:jobId/apply", authenticate, verifyRole["candidate"], upload.single("resume"), applyJob);

router.get("/me", authenticate, verifyRole(["candidate"]), myApplications);

router.get("/:jobId/applicants", authenticate, verifyRole(["employer"]), getJobApplications);

router.patch("/:applicationsId/status", authenticate, verifyRole(["employer"]), updateApplicationStatus);

export default router;