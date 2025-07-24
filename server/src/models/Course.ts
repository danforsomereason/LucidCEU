import mongoose, { Schema, Document } from "mongoose";

interface Course extends Document {
    name: string;
    ce_hours: number;
    course_state: string;
    course_tags: string[];
    learning_objectives: string[];
    course_description: string;
    instructor_id: string;
    course_modules: string[];
    premium: boolean;
    imageurl: string;
    approved_by?: Array<{
        board: "NBCC" | "APA" | "ASWB" | "NAADAC" | "CAMFT" | "Nursing";
        logo_url: string;
    }>;
}
// Define the schema for the Course model
const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    ce_hours: { type: Number, required: true },
    course_state: { type: String, required: true },
    course_tags: { type: [String], required: true },
    learning_objectives: { type: [String], required: true },
    instructor_id: { type: mongoose.Types.ObjectId, required: true },
    course_description: { type: String, required: true },
    course_modules: { type: [String], required: true },
    premium: { type: Boolean, required: true, default: false },
    imageurl: { type: String, required: false },
    approved_by: [
        {
            board: {
                type: String,
                enum: ["NBCC", "APA", "ASWB", "NAADAC", "CAMFT", "Nursing"],
                required: false,
            },
            logo_url: { type: String, required: false },
        },
    ],
});

const CourseModel = mongoose.model<Course>("Course", CourseSchema);
export default CourseModel;
