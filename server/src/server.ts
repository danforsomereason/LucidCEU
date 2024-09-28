import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json()); // Middleware

app.get("/", (req: Request, res: Response) => {
    res.send("is me, a test");
});

mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
