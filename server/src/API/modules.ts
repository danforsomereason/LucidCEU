import express, { Request, Response } from "express";
import Module, { ContentItemArrayZod, ModuleZod } from "../models/Module";
import authenticate from "../utils/authenticate";
import CourseProgress from "../models/CourseProgress";
import CourseModel from "../models/Course";
import mongoose from "mongoose";
import getModulesByCourseId from "../utils/functions";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const user = await authenticate(req.headers.authorization);

        if (!user) {
            return res
                .status(400)
                .json({ message: "You are not logged in to get the modules." });
        }

        const courseProgress = await CourseProgress.findOne({});

        const moduleIds = req.query.ids?.toString().split(",");

        if (!moduleIds) {
            return res.status(400).json({ message: "No module IDs provided" });
        }

        const modules = await Module.find({
            _id: { $in: moduleIds },
        });

        res.json(modules);
    } catch (err) {
        console.error("Error in /api/modules:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/", async (req: any, res: any) => {
    try {
        const user = await authenticate(req.headers.authorization);

        if (!user) {
            return res.status(400).json({ message: "You are not logged in." });
        }

        if (user.role !== "instructor") {
            return res
                .status(401)
                .json({ message: "Only instructors can create modules" });
        }

        // Validate content items
        const result = ModuleZod.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid module data" });
        }

        const course = await CourseModel.findById(result.data.course_id);
        if (!course) {
            return res.status(400).json({ message: "Course not found" });
        }

        if (course.instructor_id !== user.id) {
            return res.status(400).json({
                message: "You are not an instructor for this course.",
            });
        }

        const module = new Module(req.body);
        await module.save();
        res.status(201).json(module);
    } catch (err) {
        console.error("Error creating module:", err);
        res.status(500).json({ message: "Error creating module" });
    }
});

// given a course id, return all modules for that course
router.get("/by-course/:courseId", async (req: Request, res: Response) => {
    try {
        const user = await authenticate(req.headers.authorization);
        if (!user) {
            return res.status(401).json({ message: "You are not logged in." });
        }

        const course = await CourseModel.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }
        const modules = await getModulesByCourseId(req.params.courseId);

        res.json(modules);
    } catch (err) {
        console.error("Error in /api/modules:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
