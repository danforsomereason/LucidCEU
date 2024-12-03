import mongoose, { Schema, Document } from "mongoose";

interface IPlan extends Document {
    name: string;
    price: number;
    features: string[];
    max_users: number;
    max_courses: number;
    is_active: boolean;
}

const PlanSchema = new Schema<IPlan>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        // price per seat
        features: [{ type: String, required: true }],
        max_users: { type: Number, required: true },
        max_courses: { type: Number, required: true },
        is_active: { type: Boolean, required: true, default: true },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Plan = mongoose.model<IPlan>("Plan", PlanSchema);
export default Plan;
