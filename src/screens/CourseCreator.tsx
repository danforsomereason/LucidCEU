import {
    Container,
    Stack,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { globalContext } from "../context/globalContext";
import { useContext, useState } from "react";
import { previousDay } from "date-fns";
import { ModuleDef, QuizDef } from "../types";

const newModule = {
    heading: "",
    content: "",
    estimated_minutes: 0,
};

const newQuizQuestion: QuizDef = {
    question_text: "",
    question_type: "Multiple choice",
    options: [],
    correct_answer: "",
    explanation: "",
};

export default function CourseCreator() {
    const global = useContext(globalContext);
    const [modules, setModules] = useState<ModuleDef[]>([newModule]);
    const [quizQuestions, setQuizQuestions] = useState<QuizDef[]>([]);

    function addModule() {
        setModules((prev) => {
            return [...prev, newModule];
        });
    }

    if (
        !global?.currentUser ||
        !["instructor", "super_admin"].includes(global?.currentUser.role)
    ) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h3">
                    You must be classified as an instructor to create a course.
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h3" gutterBottom>
                Course Details
            </Typography>
            <Stack spacing={2}>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Course Title"
                    fullWidth
                />
                <TextField
                    name="course_description"
                    variant="outlined"
                    label="Course Description"
                    fullWidth
                    multiline
                    rows={4}
                />
            </Stack>
            <Typography variant="h3" gutterBottom>
                Course Modules
            </Typography>
            {modules.map((module, index) => {
                return (
                    <Stack spacing={2}>
                        <TextField
                            name="heading"
                            variant="outlined"
                            label="Module Name"
                            fullWidth
                            value={module.heading}
                            onChange={(event) => {
                                setModules((prev) => {
                                    return prev.map((module, moduleIndex) => {
                                        if (index !== moduleIndex) {
                                            return module;
                                        }
                                        const newModule = {
                                            ...module,
                                            heading: event.target.value,
                                        };
                                        return newModule;
                                    });
                                });
                            }}
                        />
                        <TextField
                            name="content"
                            variant="outlined"
                            label="Module Content"
                            fullWidth
                            value={module.content}
                            onChange={(event) => {
                                setModules((prev) => {
                                    return prev.map((module, moduleIndex) => {
                                        if (index !== moduleIndex) {
                                            return module;
                                        }
                                        const newModule = {
                                            ...module,
                                            content: event.target.value,
                                        };
                                        return newModule;
                                    });
                                });
                            }}
                        />
                        <TextField
                            name="estimated_minutes"
                            variant="outlined"
                            label="Estimated Minutes"
                            fullWidth
                            value={module.estimated_minutes}
                            onChange={(event) => {
                                setModules((prev) => {
                                    return prev.map((module, moduleInex) => {
                                        if (index !== moduleInex) {
                                            return module;
                                        }
                                        const newModule = {
                                            ...module,
                                            estimated_minutes: Number(
                                                event.target.value
                                            ),
                                        };
                                        return newModule;
                                    });
                                });
                            }}
                        />
                    </Stack>
                );
            })}
            <Button variant="contained" color="primary" onClick={addModule}>
                Add Module
            </Button>
            <Typography variant="h3" gutterBottom>
                Course Quiz
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setQuizQuestions((prev) => {
                        return [...prev, newQuizQuestion];
                    });
                }}
            >
                Add Quiz Question
            </Button>
            {quizQuestions.map((question, index) => {
                const options = question.options.map((option) => {
                    return (
                        <TextField
                            variant="outlined"
                            label="Option"
                            value={option}
                            // onChange={()}
                        />

                    );
                });

                return (
                    <Stack spacing={2}>
                        <TextField
                            name="heading"
                            variant="outlined"
                            label="Question text"
                            fullWidth
                            value={question.question_text}
                        />
                        <InputLabel>Question type</InputLabel>
                        <Select
                            variant="outlined"
                            value={question.question_type}
                        >
                            <MenuItem>True/False</MenuItem>
                            <MenuItem>Multiple choice</MenuItem>
                            <MenuItem>All that apply</MenuItem>
                        </Select>
                        <Button
                            onClick={() => {
                                setQuizQuestions((prev) => {
                                    return prev.map(
                                        (question, questionIndex) => {
                                            if (index !== questionIndex) {
                                                return question;
                                            }
                                            const newQuestion = {
                                                ...question,
                                                options: [
                                                    ...question.options,
                                                    "",
                                                ],
                                            };
                                            return newQuestion;
                                        }
                                    );
                                });
                            }}
                        >
                            Add Option
                        </Button>
                        {options}

                        <TextField
                            name="correct_answer"
                            variant="outlined"
                            label="Correct answer"
                            value={question.correct_answer}
                        />
                        <TextField
                            name="explanation"
                            variant="outlined"
                            label="Explanation"
                            value={question.explanation}
                            placeholder="Explain why this is the correct answer or that the other answers are incorrect"
                        />
                    </Stack>
                );
            })}
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setModules([newModule]);
                }}
            >
                Clear
            </Button>
        </Container>
    );
}
