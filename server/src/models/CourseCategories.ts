import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the CourseCategory document
interface ICourseCategory extends Document {
    category_name: string;
    category_description: string;
}
// Define the schema for the CourseCategory model
const CourseCategorySchema: Schema = new Schema({
    category_name: { type: String, required: true },
    category_description: { type: String, required: true },
});
// Create the CourseCategory model
const CourseCategory = mongoose.model<ICourseCategory>(
    "CourseCategory",
    CourseCategorySchema
);
export default CourseCategory;
