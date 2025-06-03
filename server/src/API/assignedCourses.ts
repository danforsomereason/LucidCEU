import express, { Request, Response } from "express";
import AssignedCourseModel, { AssignedCourse } from "../models/AssignedCourse";
import authenticate from "../utils/authenticate";
import mongoose from "mongoose";

const router = express.Router();

router.post("/:courseId", async (req: Request, res: Response) => {
    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.json({
            message: "You must be logged in to register a course",
        });
    }

    const assignment = {
        course_id: new mongoose.Types.ObjectId(req.params.courseId),
        user_id: new mongoose.Types.ObjectId(user.id),
        assigned_date: new Date(),
    };

    AssignedCourseModel.insertOne(assignment);
});

router.get("/", async (req: Request, res: Response) => {
    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.json({
            message: "You must be logged in to register a course",
        });
    }

    const assignedCourses = await AssignedCourseModel.find({ user_id: user.id }).populate("Course");
    res.send(assignedCourses);
    console.log("Assigned Courses", assignedCourses);
});

export default router;
