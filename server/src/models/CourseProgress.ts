import mongoose, { Document, Schema } from "mongoose";


// Courses are entered into the ICourse array below when at least one module has been completed
interface ICourse {
    course_id: mongoose.Schema.Types.ObjectId;
    completed: boolean;
    module_progress: string[];
    completed_at: Date;
}

// CourseProgress is a model that contains the progress of a user's courses
// There are two top level properties:
// - user_id: the user's id
// - courses: an array of courses that the user has started which uses ICourse
interface ICourseProgress extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    courses: ICourse[];
}

const CourseSchema: Schema = new Schema({
    course_id: { type: Schema.Types.ObjectId, ref: "courses", required: true },
    completed: { type: Boolean, default: false },
    module_progress: [{ type: String }],
    completed_at: { type: Date },
});

const CourseProgressSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    courses: [CourseSchema],
});

const CourseProgressModel = mongoose.model<ICourseProgress>(
    "CourseProgress",
    CourseProgressSchema
);

export default CourseProgressModel;
