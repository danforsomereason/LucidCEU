import express from "express";
import mongoose, { Types } from "mongoose";
import Course from "../models/Course";

const router = express.Router();

// Get all courses (with optional filters)
router.get("/", async (req: any, res: any) => {
    try {
        const { course_category } = req.query;
        let query = {};
        if (course_category) {
            query = { course_category };
        }
        const courses = await Course.find(query);
        console.log(`Found ${courses.length} courses`);
        res.json(courses);
    } catch (err) {
        console.error("Error in /api/courses:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get single course by ID
router.get("/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        console.log("Received ID:", id);

        // Validate and convert to ObjectId
        if (!Types.ObjectId.isValid(id)) {
            console.log("Invalid MongoDB ObjectId format");
            return res.status(400).json({ message: "Invalid course ID format" });
        }

        const objectId = new Types.ObjectId(id);

        const course = await Course.findById(objectId);

        if (!course) {
            console.log("No course found with ID:", id);
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(course);
    } catch (err) {
        console.error("Error fetching course by ID:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
