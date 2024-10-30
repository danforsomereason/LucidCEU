import express from "express";
import mongoose from "mongoose";
import CourseCategory from "../models/CourseCategories";


const router = express.Router();

router.get("/", async (req, res) => {
    
    try {
        const courseCategories = await CourseCategory.find({});

        res.json(courseCategories);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
