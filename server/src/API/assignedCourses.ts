import express, { Request, Response } from "express";
import AssignedCourseModel, { AssignedCourse } from "../models/AssignedCourse";
import authenticate from "../utils/authenticate";
import mongoose from "mongoose";

const router = express.Router();

router.post("/:courseId", async (req: Request, res: Response) => {
    console.log("Course Id");

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

    const assignedCourse = await AssignedCourseModel.insertOne(assignment);
    res.send(assignedCourse);
});

router.get("/", async (req: Request, res: Response) => {
    console.log("Root");

    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.json({
            message: "You must be logged in to register a course",
        });
    }

    const assignedCourses = await AssignedCourseModel.find({
        user_id: user.id,
    });
    res.send(assignedCourses);
    console.log("Assigned Courses", assignedCourses);
});

// With populated course titles
router.get("/titles", async (req: Request, res: Response) => {
    console.log("titles");

    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.status(401).json({
            message: "You must be logged in to view assigned courses",
        });
    }
    console.log("UserID", user.id);
    try {
        const assignedCourses = await AssignedCourseModel.find({
            user_id: user.id,
        }).populate("course_id", "course_name");
        res.json(assignedCourses);
    } catch (error) {
        console.error("Error fetching populated assigned courses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
