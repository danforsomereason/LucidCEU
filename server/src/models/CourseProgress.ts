import mongoose, { Document, Schema, Types } from "mongoose";

// Define the structure for course progress
interface ICourse {
    course_id: Types.ObjectId; // Use Types.ObjectId for better compatibility
    completed: boolean;
    module_progress: Types.ObjectId[]; // Assuming these are ObjectIds referencing Modules
    completed_at: Date;
}

// Define the main CourseProgress structure
interface ICourseProgress extends Document {
    user_id: Types.ObjectId;
    courses: ICourse[];
}

// Define the Schema for individual course progress
const CourseSchema = new Schema<ICourse>({
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true }, // Ensure correct ref
    completed: { type: Boolean, default: false },
    module_progress: [{ type: Schema.Types.ObjectId, ref: "Module" }], // Ensure correct ref
    completed_at: { type: Date, default: null },
});

// Define the main CourseProgress schema
const CourseProgressSchema = new Schema<ICourseProgress>(
    {
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Ensure correct ref
        courses: [CourseSchema],
    },
    { collection: "courseProgress" } // Explicitly set the collection name
);

// Create the model with the correct schema
const CourseProgressModel = mongoose.model<ICourseProgress>(
    "CourseProgress",
    CourseProgressSchema
);

export default CourseProgressModel;