import express from "express";
import Course from "../models/Course";

const router = express.Router();

// Get specific course
router.get("/:id", async (req: any, res: any) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (err) {
        console.error('Error in /api/courses/:id:', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
