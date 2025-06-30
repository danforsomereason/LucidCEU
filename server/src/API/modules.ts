import express from "express";
import Module, { ContentItemArrayZod, ModuleZod } from "../models/Module";
import authenticate from "../utils/authenticate";
import CourseProgress from "../models/CourseProgress";
import CourseModel from "../models/Course";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const user = await authenticate(req.headers.authorization);

        if (!user) {
            return res.status(400).json({ message: "You are not logged in." });
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

export default router;
