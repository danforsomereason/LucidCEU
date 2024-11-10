import mongoose, { Schema, Document } from "mongoose";

interface IModule extends Document {
    course_name: string;
    course_id: string;
    heading: string;
    text_content: string[];
    estimated_time: number;
    order: number;
}

const ModuleSchema: Schema = new Schema({
    course_name: { type: String, required: true },
    course_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course", 
        required: true 
    },
    heading: { type: String, required: true },
    text_content: { type: [String], required: true },
    estimated_time: { type: Number, required: true },
    order: { type: Number, required: true }
});

const Module = mongoose.model<IModule>("Module", ModuleSchema);
export default Module;
