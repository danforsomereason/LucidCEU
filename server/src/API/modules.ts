import express from "express";
import Module from "../models/Module";

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        const module = await Module.find(req.query);

        res.json(module);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
