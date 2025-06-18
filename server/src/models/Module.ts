import mongoose, { Schema, Document } from "mongoose";
import { content } from "pdfkit/js/page";
import { z } from "zod";

export const textItemZod = z.object({
    type: z.literal("text"),
    content: z.string(),
});

export type TextItem = z.infer<typeof textItemZod>;

export const videoItemZod = z.object({
    type: z.literal("video"),
    videoUrl: z.string(),
    videoTitle: z.string(),
});

export type VideoItem = z.infer<typeof videoItemZod>;

export const contentItemZod = textItemZod.or(videoItemZod);

export type ContentItem = z.infer<typeof contentItemZod>;

export const contentItemArrayZod = contentItemZod.array();

export type ContentItemArray = z.infer<typeof contentItemArrayZod>;

export const moduleZod = z.object({
    _id: z.string(),
    course_name: z.string(),
    course_id: z.string(),
    content: contentItemZod.array()
})

export interface Module {
    _id: string;
    course_name: string;
    course_id: string;
    heading: string;
    content: ContentItem[];
    estimated_time: number;
    order: number;
    completed?: boolean;
}

const ContentItemSchema = new Schema({
    type: {
        type: String,
        enum: ["text", "video"],
        required: true,
    },
    content: {
        type: String,
        required: function (this: ContentItem) {
            return this.type === "text";
        },
    },
    videoUrl: {
        type: String,
        required: function (this: ContentItem) {
            return this.type === "video";
        },
    },
    videoTitle: {
        type: String,
        required: function (this: ContentItem) {
            return this.type === "video";
        },
    },
});

const ModuleSchema: Schema = new Schema({
    course_name: { type: String, required: true },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    heading: { type: String, required: true },
    content: { type: [ContentItemSchema], required: true },
    estimated_time: { type: Number, required: true },
    order: { type: Number, required: true },
});

const ModuleModel = mongoose.model<Module>("Module", ModuleSchema);
export default ModuleModel;
