import express, { Request, Response } from "express";
import Quiz from "../models/Quiz";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const { course_id } = req.query;
        console.log('Received course_id:', course_id);
        
        if (!course_id) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(course_id as string)) {
            return res.status(400).json({ message: "Invalid course ID format" });
        }

        console.log('Searching for quiz with course_id:', course_id);

        const quiz = await Quiz.find({ 
            course_id: course_id 
        });
        
        console.log('Found quiz:', JSON.stringify(quiz, null, 2));

        if (!quiz || quiz.length === 0) {
            return res.status(404).json({ message: "No quiz found for this course" });
        }

        res.json(quiz);
    } catch (err: unknown) {
        console.error('Quiz fetch error:', err);
        if (err instanceof Error) {
            res.status(500).json({ 
                message: "Internal Server Error", 
                error: err.message 
            });
        } else {
            res.status(500).json({ 
                message: "Internal Server Error", 
                error: "An unknown error occurred" 
            });
        }
    }
});

export default router;
