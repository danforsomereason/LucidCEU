import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the CourseCategory document
interface CourseCategory extends Document {
    category_name: string;
    category_description: string;
}
// Define the schema for the CourseCategory model
const CourseCategorySchema: Schema = new Schema({
    category_name: { type: String, required: true },
    category_description: { type: String, required: true },
});
// Create the CourseCategory model
const CourseCategoryModel = mongoose.model<CourseCategory>(
    "CourseCategory",
    CourseCategorySchema
);
export default CourseCategoryModel;
