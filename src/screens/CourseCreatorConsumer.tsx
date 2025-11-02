import {
    Button,
    Container,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useContext } from "react";
import { NEW_MODULE, NEW_QUIZ_QUESTION } from "../constants";
import useCourseCreator from "../context/courseCreator/useCourseCreator";
import { globalContext } from "../context/globalContext";
import { questionTypeZod } from "../types";

export default function CourseCreatorConsumer() {
    const global = useContext(globalContext);
    const courseCreator = useCourseCreator();

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
            {courseCreator.modules.map((module, index) => {
                return (
                    <Stack spacing={2}>
                        <TextField
                            name="heading"
                            variant="outlined"
                            label="Module Name"
                            fullWidth
                            value={module.heading}
                            onChange={(event) => {
                                courseCreator.updateModule(
                                    "heading",
                                    index,
                                    event.target.value
                                );
                            }}
                        />
                        <TextField
                            name="content"
                            variant="outlined"
                            label="Module Content"
                            fullWidth
                            value={module.content}
                            onChange={(event) => {
                                courseCreator.updateModule(
                                    "content",
                                    index,
                                    event.target.value
                                );
                            }}
                        />
                        <TextField
                            name="estimated_minutes"
                            variant="outlined"
                            label="Estimated Minutes"
                            fullWidth
                            value={module.estimated_minutes}
                            onChange={(event) => {
                                courseCreator.updateModule(
                                    "estimated_minutes",
                                    index,
                                    Number(event.target.value)
                                );
                            }}
                        />
                    </Stack>
                );
            })}
            <Button
                variant="contained"
                color="primary"
                onClick={courseCreator.addModule}
            >
                Add Module
            </Button>
            <Typography variant="h3" gutterBottom>
                Course Quiz
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={courseCreator.addQuestion}
            >
                Add Quiz Question
            </Button>
            {courseCreator.quizQuestions.map((question, questionIndex) => {
                const options = question.options.map((option, optionIndex) => {
                    return (
                        <>
                            <TextField
                                variant="outlined"
                                label="Option"
                                value={option}
                                onChange={(event) => {
                                    courseCreator.updateOption(
                                        questionIndex,
                                        optionIndex,
                                        event.target.value
                                    );
                                }}
                            />
                            {question.question_type !== "True/False" &&
                                optionIndex > 1 && (
                                    <Button
                                        onClick={() => {
                                            courseCreator.removeOption(
                                                questionIndex,
                                                optionIndex
                                            );
                                        }}
                                    >
                                        Remove Option
                                    </Button>
                                )}
                        </>
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
                            onChange={(event) => {
                                courseCreator.updateQuestion(
                                    "question_text",
                                    questionIndex,
                                    event.target.value
                                );
                            }}
                        />
                        <InputLabel>Question type</InputLabel>
                        <Select
                            variant="outlined"
                            value={question.question_type}
                            onChange={(event) => {
                                const newQuestionType = questionTypeZod.parse(
                                    event.target.value
                                );
                                const newOptions =
                                    newQuestionType === "True/False"
                                        ? question.options.slice(0, 2)
                                        : question.options;

                                courseCreator.updateQuestion(
                                    "question_type",
                                    questionIndex,
                                    newQuestionType
                                );
                                courseCreator.updateQuestion(
                                    "options",
                                    questionIndex,
                                    newOptions
                                );
                            }}
                        >
                            <MenuItem value="True/False">True/False</MenuItem>
                            <MenuItem value="Multiple choice">
                                Multiple choice
                            </MenuItem>
                            <MenuItem value="All that apply">
                                All that apply
                            </MenuItem>
                        </Select>
                        {question.question_type !== "True/False" && (
                            <Button
                                onClick={() => {
                                    courseCreator.addOption(questionIndex);
                                }}
                            >
                                Add Option
                            </Button>
                        )}
                        {options}

                        <TextField
                            name="correct_answer"
                            variant="outlined"
                            label="Correct answer"
                            value={question.correct_answer}
                            onChange={(event) => {
                                courseCreator.updateQuestion(
                                    "correct_answer",
                                    questionIndex,
                                    event.target.value
                                );
                            }}
                        />
                        <TextField
                            name="explanation"
                            variant="outlined"
                            label="Explanation"
                            value={question.explanation}
                            placeholder="Explain why this is the correct answer or that the other answers are incorrect"
                            onChange={(event) => {
                                courseCreator.updateQuestion(
                                    "explanation",
                                    questionIndex,
                                    event.target.value
                                );
                            }}
                        />
                    </Stack>
                );
            })}
            <Button
                variant="contained"
                color="primary"
                onClick={courseCreator.clearForm}
            >
                Clear
            </Button>
        </Container>
    );
}
