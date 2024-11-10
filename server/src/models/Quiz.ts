import mongoose, { Schema, Document } from "mongoose";

interface IQuizQuestion {
    order: number;
    question_text: string;
    question_type: string;
    options: string[];
    correct_answer: string;
    explanation: string;
}

interface IQuiz extends Document {
    course_id: string;
    quiz_title: string;
    questions: IQuizQuestion[];
    passing_score: number;
}

const QuizSchema: Schema = new Schema({
    course_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course", 
        required: true 
    },
    quiz_title: { type: String, required: true },
    questions: [{
        order: { type: Number, required: true },
        question_text: { type: String, required: true },
        question_type: { type: String, required: true },
        options: { type: [String], required: true },
        correct_answer: { type: String, required: true },
        explanation: { type: String, required: true }
    }],
    passing_score: { type: Number, required: true }
});

const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
export default Quiz; 