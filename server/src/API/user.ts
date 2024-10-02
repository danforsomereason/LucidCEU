import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
    console.log('HIT')
    res.sendStatus(200);
  });

export default router;