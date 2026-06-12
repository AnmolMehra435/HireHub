import express from "express";
import { authenticate } from "../middleware/verifyJWT.js";
import { verifyRole } from "../middleware/verifyRoles.js";
import { createJobController, updateJobController, getMyJobs, closeJobController, getOneJob , getJobs} from "../controllers/jobsController.js";

const router = express.Router();


router.post('/', authenticate, verifyRole(["employer"]), createJobController);

router.get('/my-jobs', authenticate, verifyRole(["employer"]), getMyJobs);

router.put('/:id', authenticate, verifyRole(["employer"]), updateJobController);

router.delete('/:id', authenticate, verifyRole(["employer"]), closeJobController);

//public routes

router.get('/:id', getOneJob);

router.get('/', getJobs);

export default router;