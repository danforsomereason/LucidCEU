import express, { Request, Response } from "express";
import AssignedCourseModel, { AssignedCourse } from "../models/AssignedCourse";
import authenticate from "../utils/authenticate";
import mongoose from "mongoose";
import { ModuleProgress } from "../models/ModuleProgress";

const router = express.Router();

router.post("/:courseId", async (req: Request, res: Response) => {
    console.log("Course Id");

    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.json({
            message: "You must be logged in to register a course",
        });
    }

    const existing = await AssignedCourseModel.findOne({
        user_id: user.id,
        course_id: req.params.courseId,
    });

    if (existing) {
        return res.status(409).json({ message: "Course already assigned" });
    }

    const assignment = {
        course_id: new mongoose.Types.ObjectId(req.params.courseId),
        user_id: new mongoose.Types.ObjectId(user.id),
        assigned_date: new Date(),
        organization_id: null,
    };

    const assignedCourse = await AssignedCourseModel.create(assignment);
    // Todo: make a check here so that I don't duplicate
    await ModuleProgress.create({
        course_id: new mongoose.Types.ObjectId(req.params.courseId),
        user_id: new mongoose.Types.ObjectId(user.id),
        start_module: new Date(),
    });
    res.send(assignedCourse);
});

router.get("/:courseId", async (req: Request, res: Response) => {
    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.status(401).json({
            message: "You must be logged in to find assigned courses.",
        });
    }

    console.log("AUTH user.id:", user.id);
    console.log("REQ param course_id:", req.params.courseId);

    const assignedCourses = await AssignedCourseModel.findOne({
        course_id: new mongoose.Types.ObjectId(req.params.courseId),
        user_id: new mongoose.Types.ObjectId(user.id),
    });
    if (!assignedCourses) {
        return res.status(404).json({ message: "Course not assigned to user" });
    }
    res.status(200).json(assignedCourses);
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
    console.log("User in my assigned courses api", user);

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
