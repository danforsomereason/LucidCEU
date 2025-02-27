import express, { Request, Response } from "express";
import CourseProgress from "../models/CourseProgress";
import Course from "../models/Course";

const router = express.Router();

// I want to search for the logged-in user's id in the courseProgress collection
// What I want returned is the array of courses in the courseProgress collection
// This array of objects contains a course_id string reference, a completed boolean, an array of module_id string references, and a completed_at timestamp.

// My questions are:
// Should the types be req: Request, res: Response, or do I need to define them some other way?

router.get("/", async (req: Request, res: Response) => {
    try {
        const docs = await CourseProgress.find();

        res.send(docs);
        console.log("Docs", docs);
    } catch (err) {
        console.error("Error in /api/course_progress", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
