import { createContext, Dispatch, SetStateAction } from "react";
import { ModuleDef, QuizQuestionDef } from "../../types";

export interface CourseCreatorValue {
    modules: ModuleDef[];
    quizQuestions: QuizQuestionDef[];
    addModule: () => void;
    updateModule: <K extends keyof ModuleDef>(
        key: K,
        index: number,
        value: ModuleDef[K]
    ) => void;
    addQuestion: () => void;
    updateQuestion: <K extends keyof QuizQuestionDef>(
        key: K,
        index: number,
        value: QuizQuestionDef[K]
    ) => void;
    addOption: (questionIndex: number) => void;
    updateOption: (questionIndex: number, optionIndex: number, optionValue: string) => void;
    removeOption: (questionIndex: number, optionIndex: number) => void;
    clearForm: () => void;
}

export const CourseCreatorContext = createContext<
    CourseCreatorValue | undefined
>(undefined);
