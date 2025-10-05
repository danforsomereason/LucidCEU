import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export const questionTypeZod = z.enum([
    "True/False",
    "Multiple choice",
    "All that apply",
]);

type QuestionType = z.infer<typeof questionTypeZod>;

export const QuizQuestionZod = z.object({
    _id: z.string(),
    order: z.number(),
    question_text: z.string(),
    question_type: questionTypeZod,
    options: z.array(z.string()),
    correct_answer: z.string(),
    explanation: z.string(),
});

export type QuizQuestion = z.infer<typeof QuizQuestionZod>;

export const CourseZod = z.object({
    name: z.string(),
    ce_hours: z.number(),
    course_state: z.string(),
    course_tags: z.array(z.string()).optional(),
    learning_objectives: z.array(z.string()),
    course_description: z.string(),
    //You'll need to fix this because instructor_name is used elsewhere
    instructor_id: z.string(),
    course_modules: z.array(z.string()),
    premium: z.boolean(),
    imageurl: z.string().optional(),
    questions: z.array(QuizQuestionZod),
    passing_score: z.number().optional(),
    approved_by: z
        .array(
            z.object({
                board: z.enum([
                    "NBCC",
                    "APA",
                    "ASWB",
                    "NAADAC",
                    "CAMFT",
                    "Nursing",
                ]),
                logo_url: z.string(),
            })
        )
        .optional(),
});

export type Course = z.infer<typeof CourseZod>;

// Define the schema for the Course model
const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    ce_hours: { type: Number, required: true },
    course_state: { type: String, required: true },
    course_tags: { type: [String], required: false },
    learning_objectives: { type: [String], required: true },
    instructor_id: { type: mongoose.Types.ObjectId, required: true },
    course_description: { type: String, required: true },
    course_modules: { type: [String], required: true },
    premium: { type: Boolean, required: true, default: false },
    imageurl: { type: String, required: false },
    questions: [
        {
            _id: { type: String, required: true },
            order: { type: Number, required: true },
            question_text: { type: String, required: true },
            question_type: {
                type: String,
                enum: ["True/False", "Multiple choice", "All that apply"],
                required: true,
            },
            options: { type: [String], required: true },
            correct_answer: { type: String, required: true },
            explanation: { type: String, required: true },
        },
    ],
    passing_score: { type: Number, required: false },
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

const CourseModel = mongoose.model<Course>("Course", CourseSchema);
export default CourseModel;
