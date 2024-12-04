import React, { useState, useEffect } from "react";
import {Box, Typography, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl, Alert, CircularProgress} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate, useLocation } from 'react-router-dom';

interface QuizQuestion {
    order: number;
    question_text: string;
    question_type: string;
    options: string[];
    correct_answer: string;
    explanation: string;
}

interface QuizProps {
    courseId: string;
    onQuizComplete: (passed: boolean) => void;
}

interface LocationState {
    attemptNumber?: number;
    retakeQuiz?: boolean;
}

const CourseQuiz: React.FC<QuizProps> = ({ courseId, onQuizComplete }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                if (!courseId) {
                    throw new Error('No course ID provided');
                }
                
                console.log('Fetching quiz for courseId:', courseId);
                console.log('Full URL:', `http://localhost:5001/api/v1/quizzes?course_id=${courseId}`);
                
                const response = await fetch(`http://localhost:5001/api/v1/quizzes?course_id=${courseId}`);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Error response body:', errorText);
                    throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
                }
                
                const data = await response.json();
                console.log('Received quiz data:', data);
                
                if (!data || !data[0] || !data[0].questions) {
                    console.log('Invalid data structure:', data);
                    throw new Error('Invalid quiz data structure');
                }
                
                setQuestions(data[0].questions);
            } catch (error) {
                console.error('Error fetching quiz:', error);
                setError(error instanceof Error ? error.message : 'Failed to load quiz');
            } finally {
                setLoading(false);
            }
        };
        
        if (courseId) {
            fetchQuiz();
        } else {
            console.warn('No courseId provided to CourseQuiz component');
        }
    }, [courseId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!questions.length) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="info">
                    No quiz questions available for this course.
                </Alert>
            </Box>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setSelectedAnswer(answer.toLowerCase());
    };

    const renderOptions = () => {
        if (currentQuestion.question_type === 'true_false') {
            return (
                <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
                    <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                        disabled={showFeedback}
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                        disabled={showFeedback}
                    />
                </RadioGroup>
            );
        } else {
            return (
                <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
                    {currentQuestion.options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={String.fromCharCode(97 + index)}
                            control={<Radio />}
                            label={option}
                            disabled={showFeedback}
                        />
                    ))}
                </RadioGroup>
            );
        }
    };

    const handleNextQuestion = () => {
        if (!showFeedback) {
            setShowFeedback(true);
            setUserAnswers({ ...userAnswers, [currentQuestionIndex]: selectedAnswer });
        } else {
            setShowFeedback(false);
            setSelectedAnswer('');
            
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                const finalAnswers = {
                    ...userAnswers,
                    [currentQuestionIndex]: selectedAnswer
                };

                const totalCorrectAnswers = Object.entries(finalAnswers).filter(
                    ([index, answer]) => answer.toLowerCase() === questions[Number(index)].correct_answer.toLowerCase()
                ).length;

                const score = Math.round((totalCorrectAnswers / questions.length) * 100);
                
                const currentAttempt = (location.state as LocationState)?.attemptNumber || 1;
                
                navigate('/quiz-results', {
                    state: {
                        score,
                        courseId,
                        attemptNumber: currentAttempt
                    }
                });
            }
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0 && !showFeedback) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || '');
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Question {currentQuestion.order} of {questions.length}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
                {currentQuestion.question_text}
            </Typography>

            <FormControl component="fieldset">
                {renderOptions()}
            </FormControl>

            {showFeedback && (
                <Alert 
                    severity={selectedAnswer.toLowerCase() === currentQuestion.correct_answer.toLowerCase() ? "success" : "error"}
                    sx={{ mt: 2 }}
                >
                    <Typography variant="body1" gutterBottom>
                        {selectedAnswer.toLowerCase() === currentQuestion.correct_answer.toLowerCase()
                            ? "Correct!" 
                            : `Incorrect. The correct answer was: ${currentQuestion.correct_answer}`}
                    </Typography>
                    <Typography variant="body2">
                        {currentQuestion.explanation}
                    </Typography>
                </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                    variant="outlined"
                    startIcon={<NavigateBeforeIcon />}
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0 || showFeedback}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    endIcon={<NavigateNextIcon />}
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                >
                    {!showFeedback ? 'Submit Answer' : 
                        currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
            </Box>
        </Paper>
    );
};

export default CourseQuiz;