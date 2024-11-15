import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Course document
interface ICourse extends Document {
    course_name: string;
    ce_hours: number;
    course_state: string;
    course_category: string;
    tags: string[];
    learning_objectives: string[];
    course_description: string;
    course_instructor: string;
    course_price: number;
    course_sections: string[];
    url: string;
    approved_by?: Array<{
        board: "NBCC" | "APA" | "ASWB" | "NAADAC" | "CAMFT" | "Nursing";
        logo_url: string;
    }>;
}
// Define the schema for the Course model
const CourseSchema: Schema = new Schema({
    course_name: { type: String, required: true },
    ce_hours: { type: Number, required: true },
    course_state: { type: String, required: true },
    course_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseCategory",
    },
    tags: { type: [String], required: false },
    learning_objectives: { type: [String], required: true },
    course_instructor: { type: String, required: true },
    course_price: { type: Number, required: true },
    course_description: { type: String, required: true },
    course_sections: { type: [String], required: true },
    url: { type: String, required: true },
    approved_by: [{
        board: {
            type: String,
            enum: ["NBCC", "APA", "ASWB", "NAADAC", "CAMFT", "Nursing"],
            required: false
        },
        logo_url: { type: String, required: false }
    }]
});
// Create the Course model
const Course = mongoose.model<ICourse>("Course", CourseSchema);
export default Course;
