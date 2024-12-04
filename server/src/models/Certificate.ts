import mongoose, { Schema, Document } from "mongoose";

interface IssueHistory {
    issued_at: Date;
    certificate_number: string;
    quiz_score: number;
    certificate_url?: string;
}

interface ICertificate extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    course_id: mongoose.Schema.Types.ObjectId;
    // Include all instance so that you can later track annual compliance
    issued_history: Array<{
        issued_at: Date;
        certificate_number: string;
        quiz_score: number;
        certificate_url?: string;
    }>;
    approved_by: Array<{
        board: "NBCC" | "APA" | "ASWB" | "NAADAC" | "CAMFT" | "Nursing";
        logo_url: string;
    }>;

    getMostRecentIssue(): IssueHistory | undefined;
}

const CertificateSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    issued_history: [
        {
            issued_at: { type: Date, default: Date.now },
            certificate_number: { type: String, required: true },
            quiz_score: { type: Number, required: true },
            certificate_url: { type: String, required: false },
        },
    ],
    approved_by: [
        {
            board: {
                type: String,
                enum: ["NBCC", "APA", "ASWB", "NAADAC", "CAMFT", "Nursing"],
                required: false,
            },
            logo_url: { type: String, required: false },
        },
    ],
});

CertificateSchema.methods.getMostRecentIssue = function () {
    return this.issued_history.sort(
        (a: IssueHistory, b: IssueHistory) =>
            b.issued_at.getTime() - a.issued_at.getTime()
    )[0];
};

export default mongoose.model<ICertificate>("Certificate", CertificateSchema);
