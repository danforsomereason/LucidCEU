import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./API/users";
import courseCategoriesRouter from "./API/course_categories";
import coursesRouter from "./API/courses";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course_categories", courseCategoriesRouter);
app.use("/api/v1/courses", coursesRouter);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "");
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const collections = await db?.listCollections().toArray();
        if (collections) {
            console.log("Available collections:");
            collections.forEach((collection: any) =>
                console.log(collection.name)
            );
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
