import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./API/user";
import courseCategoriesRouter from "./API/course_categories";
import cors from "cors";

dotenv.config();
mongoose.connect(
    "mongodb+srv://danhutcheson:s1eLSHwrhBM8OyMq@clusterlucid.al58s.mongodb.net/?retryWrites=true&w=majority&appName=clusterLucid"
);
console.log("Database connected");

const app = express();

app.use(cors());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/course_categories", courseCategoriesRouter);

// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//     res.send("is me, a test");
// });

// mongoose
//     .connect(process.env.MONGO_URI || "")
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.error(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
