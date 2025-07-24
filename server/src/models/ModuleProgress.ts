import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export const ModuleProgressZod = z.object({
    _id: z.string(),
    module_id: z.string(),
    user_id: z.string(),
    start_module: z.date(),
    end_module: z.date(),
});

export type ModuleProgress = z.infer<typeof ModuleProgressZod>;

const ModuleProgressSchema = new Schema({
    module_id: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    start_module: { type: Date, required: true },
    end_module: { type: Date, required: true },
});

export const ModuleProgress = mongoose.model<ModuleProgress>(
    "ModuleProgress",
    ModuleProgressSchema
);
