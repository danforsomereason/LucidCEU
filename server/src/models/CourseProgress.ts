import mongoose, { Document, Schema } from 'mongoose';

interface ICourseProgress extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    course_id: mongoose.Schema.Types.ObjectId;
    started_at: Date;
    completed_at: Date;
    status: 'in_progress' | 'completed' | 'not_started';
}

const CourseProgressSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    started_at: { type: Date, default: Date.now },
    completed_at: { type: Date },
    status: { type: String, enum: ['in_progress', 'completed', 'not_started'], default: 'not_started' },
});

const CourseProgressModel = mongoose.model<ICourseProgress>('CourseProgress', CourseProgressSchema);
export default CourseProgressModel;