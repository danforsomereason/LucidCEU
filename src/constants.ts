import { QuizQuestionDef as QuizQuestionDef } from "./types";

export const NEW_MODULE = {
    heading: "",
    content: "",
    estimated_minutes: 0,
};

export const NEW_QUIZ_QUESTION: QuizQuestionDef = {
    question_text: "",
    question_type: "Multiple choice",
    options: ["", ""],
    correct_answer: "",
    explanation: "",
};
