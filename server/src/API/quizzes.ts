import express from "express";
import Quiz from "../models/Quiz";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const quiz = await Quiz.find(req.query);

        res.json(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
