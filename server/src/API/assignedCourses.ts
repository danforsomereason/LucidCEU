import express, { Request, Response } from "express";
import AssignedCourseModel, { AssignedCourse } from "../models/AssignedCourse";
import authenticate from "../utils/authenticate";
import mongoose from "mongoose";
import {
    ModuleProgressModel,
    ModuleProgressZod,
} from "../models/ModuleProgress";
import ModuleModel from "../models/Module";
import getModulesByCourseId from "../utils/functions";

const router = express.Router();

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

router.post("/:courseId", async (req: Request, res: Response) => {
    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.json({
            message: "You must be logged in to register a course",
        });
    }
    const courseId = req.params.courseId;

    let assignedCourse = await AssignedCourseModel.findOne({
        user_id: user.id,
        course_id: courseId,
    });

    if (!assignedCourse) {
        assignedCourse = await AssignedCourseModel.create({
            course_id: new mongoose.Types.ObjectId(req.params.courseId),
            user_id: new mongoose.Types.ObjectId(user.id),
            assigned_date: new Date(),
            organization_id: null,
        });
    }
    console.log("Course ID on assigned course route:", courseId);
    // Todo: make a check here so that I don't duplicate
    const modules = await getModulesByCourseId(req.params.courseId);
    const sortedModules = modules.sort((a, b) => {
        return a.order - b.order;
    });

    const firstModule = sortedModules[0];

    if (!firstModule) {
        return res
            .status(404)
            .json({ message: "No modules found for this course" });
    }

    const existingProgress = await ModuleProgressModel.findOne({
        user_id: user.id,
        module_id: firstModule._id,
    });

    if (!existingProgress) {
        await ModuleProgressModel.create({
            course_id: new mongoose.Types.ObjectId(req.params.courseId),
            user_id: new mongoose.Types.ObjectId(user.id),
            module_id: firstModule._id,
            start_module: new Date(),
            end_module: null,
        });
    }

    return res.status(201).json({
        message: "Course assigned and progress started",
        assignedCourse,
    });
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

    const assignedCourse = await AssignedCourseModel.findOne({
        course_id: new mongoose.Types.ObjectId(req.params.courseId),
        user_id: new mongoose.Types.ObjectId(user.id),
    });
    if (!assignedCourse) {
        return res.status(404).json({ message: "Course not assigned to user" });
    }
    res.status(200).json(assignedCourse);
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

export default router;
