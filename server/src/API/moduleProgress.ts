import express, { Request, Response } from "express";
import {
    ModuleProgressModel,
    ModuleProgressZod,
} from "../models/ModuleProgress";
import authenticate from "../utils/authenticate";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {})

router.post("/", async (req: Request, res: Response) => {
    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.json({
            message: "You must be logged in to register a course",
        });
    }

    const courseId = req.params.courseId;

    let completedModule = await ModuleProgressModel.findOne({
        user_id: user.id,
        course_id: courseId,
        module_id: module.id
    });
});
