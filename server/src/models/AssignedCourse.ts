import mongoose, { Schema, Document } from "mongoose";

export interface AssignedCourse extends Document {
    course_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    assigned_date: Date;
    completed_date: Date;
}

const AssignedCourseSchema = new Schema<AssignedCourse>(
    {
        course_id: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        assigned_date: { type: Date, required: true },
        completed_date: { type: Date, required: false },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const AssignedCourseModel = mongoose.model<AssignedCourse>(
    "AssignedCourse",
    AssignedCourseSchema
);
export default AssignedCourseModel;
