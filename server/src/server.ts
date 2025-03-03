import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./API/users";
import courseCategoriesRouter from "./API/course_categories";
import coursesRouter from "./API/courses";
import modulesRouter from "./API/modules";
import quizzesRouter from "./API/quizzes";
import certificatesRouter from "./API/certificates";
import organizationsRouter from "./API/organizations";
import plansRouter from "./API/plans";
import courseProgressRouter from "./API/course_progress";
import cors from "cors";
import "./types/express";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course_categories", courseCategoriesRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/course_progress", courseProgressRouter);
app.use("/api/v1/modules", modulesRouter);
app.use("/api/v1/quizzes", quizzesRouter);
app.use("/api/v1/certificates", certificatesRouter);
app.use("/api/v1/organizations", organizationsRouter);
app.use("/api/v1/plans", plansRouter);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "");
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const collections = await db?.listCollections().toArray();
        if (collections) {
            console.log("Available collections:");
            collections.forEach((collection) => console.log(collection.name));
        }
    } catch (err) {
        console.error(
            "Error connecting to MongoDB or listing collections",
            err
        );
    }
};

connectToDatabase();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
