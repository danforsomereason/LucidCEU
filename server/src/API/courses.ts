import express from "express";
import mongoose from "mongoose";
import Course from "../models/Course";

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        const course = await Course.find(req.query);

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
