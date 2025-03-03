import express, { Request, Response } from "express";
import CourseProgress from "../models/CourseProgress";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const docs = await CourseProgress.find({});
    res.send(docs);
    console.log("Docs", docs);
});

export default router;
