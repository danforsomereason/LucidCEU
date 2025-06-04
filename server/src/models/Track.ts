import mongoose, { Schema, Document } from "mongoose";

type License =
    | "Mental Health Counselor (e.g., LPC, LMHC)"
    | "Social Worker"
    | "Marriage & Family Therapist"
    | "Licensed Drug and Alcohol Counselor (e.g., LADAC, LCDC)"
    | "Nurse"
    | "Psychologist"
    | "Physician"
    | "Other"
    | "Not Applicable";

export interface Track extends Document {
    name: string;
    description: string;
    organization_id: mongoose.Types.ObjectId;
    course_ids: mongoose.Types.ObjectId[];
    created_at: Date;
    updated_at: Date;
    updated_by: mongoose.Types.ObjectId;
    target_license: License;
}

const TrackSchema = new Schema<Track>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    course_ids: [
        { type: Schema.Types.ObjectId, ref: "Course", required: true },
    ],
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    updated_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    target_license: {
        type: String,
        required: true,
        default: "Not Applicable",
    },
});

const TrackModel = mongoose.model<Track>("Track", TrackSchema);
export default TrackModel;
