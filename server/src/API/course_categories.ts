import express from "express";
import mongoose from "mongoose";
import "../models/CourseCategories";

const CourseCategory = mongoose.model("CourseCategory");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const courseCategories = await CourseCategory.find();
        console.log(courseCategories);

        res.json(courseCategories);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
