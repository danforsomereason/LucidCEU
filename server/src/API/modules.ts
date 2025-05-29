import express from "express";
import Module from "../models/Module";
import authenticate from "../utils/authenticate";
import CourseProgress from "../models/CourseProgress";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const user = await authenticate(req.headers.authorization);

        if (!user) {
            return res.status(400).json({ message: "You are not logged in." });
        }

        const courseProgress = await CourseProgress.findOne({});

        const moduleIds = req.query.ids?.toString().split(",");

        if (!moduleIds) {
            return res.status(400).json({ message: "No module IDs provided" });
        }

        const modules = await Module.find({
            _id: { $in: moduleIds },
        });

        res.json(modules);
    } catch (err) {
        console.error("Error in /api/modules:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
