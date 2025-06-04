import mongoose, { Schema, Document } from "mongoose";

interface Plan extends Document {
    name: string;
    basePrice: number;
    userLimit: number;
    includedAdmins: number;
    additionalAdminPrice: number;
    instructors: mongoose.Types.ObjectId[];
    instructorPrice: number;
    features: string[];
    storageLimit: number; // in GB
    additionalStoragePrice: number; // price per additional GB
    is_active: boolean;
}

const PlanSchema = new Schema<Plan>(
    {
        name: { type: String, required: true },
        basePrice: { type: Number, required: true },
        userLimit: { type: Number, required: true },
        includedAdmins: { type: Number, required: true, default: 1 },
        instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        additionalAdminPrice: { type: Number, required: true, default: 20 },
        instructorPrice: { type: Number, required: true, default: 100 },
        features: [{ type: String, required: true }],
        storageLimit: { type: Number, required: true }, // in GB
        additionalStoragePrice: { type: Number, required: true }, // price per GB
        is_active: { type: Boolean, required: true, default: true },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const PlanModel = mongoose.model<Plan>("Plan", PlanSchema);
export default PlanModel;
