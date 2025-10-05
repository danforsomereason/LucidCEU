import mongoose, { Schema } from "mongoose";
import { z } from "zod";

export const quizResponseZod = z.object({
    course_id: z.string(),
    user_id: z.string(),
    answers: z.array(
        z.object({
            question_id: z.number(),
            selected_answer: z.string(),
        })
    ),
});

type QuizResponse = z.infer<typeof quizResponseZod>;

const QuizResponseSchema: Schema = new Schema({
    course_id: { type: String, required: true },
    user_id: { type: String, required: true },
    answers: { type: [Object], required: true },
});

export const QuizResponseModel = mongoose.model<QuizResponse>(
    "QuizResponse",
    QuizResponseSchema
);
export default QuizResponseModel;
