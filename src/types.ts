import { z } from "zod";

// Module
export interface TextItem {
    type: "text";
    content: string;
}

export interface VideoItem {
    type: "video";
    videoUrl: string;
    videoTitle: string;
}

export type ContentItem = TextItem | VideoItem;

export interface Module {
    _id: string;
    course_id: string;
    heading: string;
    content: ContentItem[];
    estimated_time: number;
    order: number;
    completed?: boolean;
}

export const ModuleProgressZod = z.object({
    _id: z.string(),
    module_id: z.string(),
    user_id: z.string(),
    start_module: z.date(),
    end_module: z.date().optional(),
});

export type ModuleProgress = z.infer<typeof ModuleProgressZod>;

export const moduleDefZod = z.object({
    heading: z.string(),
    content: z.string(),
    estimated_minutes: z.number(),
});

export type ModuleDef = z.infer<typeof moduleDefZod>;

// Course
export const questionTypeZod = z.enum([
    "True/False",
    "Multiple choice",
    "All that apply",
]);

export type QuestionType = z.infer<typeof questionTypeZod>;

// Quiz Def
export const quizDefZod = z.object({
    question_text: z.string(),
    question_type: questionTypeZod,
    options: z.array(z.string()),
    correct_answer: z.number(),
    explanation: z.string(),
});

export type QuizQuestionDef = z.infer<typeof quizDefZod>;

export const quizQuestionZod = quizDefZod.extend({
    _id: z.string(),
    order: z.number(),
});

type QuizQuestion = z.infer<typeof quizQuestionZod>;

export const CourseZod = z.object({
    _id: z.string(),
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
    questions: z.array(quizQuestionZod),
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

// Quiz Response
export const quizResponseZod = z.object({
    _id: z.string(),
    course_id: z.string(),
    user_id: z.string(),
    answers: z.array(
        z.object({
            question_number: z.number(),
            selected_answer: z.string(),
        })
    ),
});

export type QuizResponse = z.infer<typeof quizResponseZod>;

// Survey Response
export const surveyResponseZod = z.object({
    survey_id: z.string(),
    user_id: z.string(),
    responses: z.array(z.string()),
});

export type SurveyResponse = z.infer<typeof surveyResponseZod>;

// User
const roleSchema = z.union([
    z.literal("admin"),
    z.literal("instructor"),
    z.literal("user"),
    z.literal("super_admin"),
]);

type Role = z.infer<typeof roleSchema>;

const userZodSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password_hash: z.string(),
    organization_id: z.string().optional(),
    license_type: z.string(),
    role: roleSchema,
});

export type User = z.infer<typeof userZodSchema>;
