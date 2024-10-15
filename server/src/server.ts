import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./API/user";
import courseCategoriesRouter from "./API/course_categories";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/course_categories", courseCategoriesRouter);

mongoose
    .connect(
        "mongodb+srv://danhutcheson:s1eLSHwrhBM8OyMq@clusterlucid.al58s.mongodb.net/?retryWrites=true&w=majority&appName=clusterLucid"
    )
    .then(() => {const db = mongoose.connection.db;

        db?.listCollections().toArray((err:any, collections:any) => {
          if (err) {
            console.error("Error listing collections:", err);
            return;
          }
          
          console.log("Available Collections:");
          collections.forEach(collection => console.log(collection.name));
        });})
    .catch((err) => console.error(err));



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
