import express from "express";
import mongoose from "mongoose";
import Course from "../models/Course";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const { course_category } = req.query;

        let query = {};
        if (course_category) {
            query = { course_category: course_category };
        }

        const courses = await Course.find(query);

        res.json(courses);
    } catch (err) {
        console.error("Error in /api/courses:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
