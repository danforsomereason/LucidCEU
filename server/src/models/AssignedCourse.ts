import mongoose, { Schema, Document } from "mongoose";
import { string, z } from "zod";

export const CourseNameZod = z.object({
    _id: z.string(),
    course_name: z.string(),
});

export const RelatedAssignedCourseZod = z.object({
    _id: z.string(),
    course_id: CourseNameZod,
    user_id: z.string(),
    assigned_date: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type RelatedAssignedCourse = z.infer<typeof RelatedAssignedCourseZod>;

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
