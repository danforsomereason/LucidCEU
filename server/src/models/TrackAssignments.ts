import mongoose, { Schema, Document } from "mongoose";

export interface TrackAssignment extends Document {
    user_id: mongoose.Types.ObjectId;
    track_id: mongoose.Types.ObjectId;
    assigned_at: Date;
    assigned_by: mongoose.Types.ObjectId;
}

const TrackAssignmentSchema = new Schema<TrackAssignment>({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    track_id: { type: Schema.Types.ObjectId, ref: "Track", required: true },
    assigned_at: { type: Date, required: true, default: Date.now },
    assigned_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const TrackAssignmentModel = mongoose.model<TrackAssignment>(
    "TrackAssignment",
    TrackAssignmentSchema
);
export default TrackAssignmentModel;
