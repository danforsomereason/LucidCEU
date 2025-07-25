// src/screens/CourseModule.tsx
import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    LinearProgress,
    styled,
    CircularProgress,
    BoxProps,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuizIcon from "@mui/icons-material/Quiz";
import CourseQuiz from "../components/CourseQuiz";
import { useParams } from "react-router-dom";
import { globalContext } from "../context/globalContext";

// Constants
const DRAWER_WIDTH = 280;
const NAVBAR_HEIGHT = 84;

// Types
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
    course_name: string;
    course_id: string;
    heading: string;
    content: ContentItem[];
    estimated_time: number;
    order: number;
    completed?: boolean;
}

interface SectionItemProps extends BoxProps {
    isLocked?: boolean;
}

// Styled Components
const ModuleContainer = styled(Box)({
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
});

const SideBar = styled(Box)(({ theme }) => ({
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    position: "fixed",
    top: NAVBAR_HEIGHT,
    left: 0,
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
}));

const MainContent = styled(Box)(({ theme }) => ({
    marginLeft: DRAWER_WIDTH,
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    position: "fixed",
    top: NAVBAR_HEIGHT,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
    overflow: "hidden",
}));

const CourseTitle = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SectionItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isLocked",
})<SectionItemProps>(({ theme, isLocked }) => ({
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    cursor: isLocked ? "not-allowed" : "pointer",
    "&:hover": {
        backgroundColor: isLocked ? "transparent" : theme.palette.action.hover,
    },
    opacity: isLocked ? 0.5 : 1,
}));

const HelpButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    bottom: theme.spacing(3),
    left: theme.spacing(3),
}));

const CourseModule: React.FC = () => {
    const global = useContext(globalContext);
    const { courseId } = useParams();
    const [modules, setModules] = useState<Module[]>([]);
    //const modules = useStore((state) => state.modules);
    //const updateModules = useStore((state) => state.updateModules);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    const [currentModuleId, setCurrentModuleId] = useState<string>("");
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);

    // Fetch modules data
    useEffect(() => {
        setLoading(true);
        // setError(null);
        const fetchModules = async () => {
            try {
                const token = global?.token;

                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };
                console.log("Before assigned token:", global?.token);
                // confirm user is assigned to this course
                const assignedRes = await fetch(
                    `http://localhost:5001/api/v1/assigned_courses/${courseId}`,
                    {
                        method: "GET",
                        headers,
                    }
                );
                if (assignedRes.status === 404) {
                    throw new Error("You are not assigned to this course.");
                }
                console.log("Before modules token:", global?.token);
                // get the modules associated with this course
                const modulesRes = await fetch(
                    `http://localhost:5001/api/v1/modules/by-course/${courseId}`,
                    {
                        method: "GET",
                        headers,
                    }
                );

                if (!modulesRes.ok) {
                    throw new Error(`HTTP error! status: ${modulesRes.status}`);
                }
                const modulesData = await modulesRes.json();

                if (!Array.isArray(modulesData)) {
                    throw new Error(
                        "The module response didn't return an array of modules"
                    );
                }

                const sortedModules = modulesData.sort(
                    (a: Module, b: Module) => a.order - b.order
                );
                setModules(sortedModules);
                setCurrentModuleId(sortedModules[0]?._id || "");
            } catch (error) {
                console.error("Detailed fetch error:", error);
                //updateCourses

                setModules([]);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchModules();
        }
    }, [courseId]);

    // Add loading state handling
    if (loading) {
        return (
            <ModuleContainer>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            </ModuleContainer>
        );
    }

    const currentModule = modules.find((m) => m._id === currentModuleId);

    const progress = (completedModules.length / modules.length) * 100;

    // Helper function to check if a module is should be locked or open depending on progress
    const isModuleAccessible = (moduleId: string) => {
        const moduleIndex = modules.findIndex((m) => m._id === moduleId);
        const lastCompletedIndex = Math.max(
            -1,
            ...completedModules.map((id) =>
                modules.findIndex((m) => m._id === id)
            )
        );

        return moduleIndex <= lastCompletedIndex + 1;
    };

    // Update module selection handler
    const handleModuleSelect = (moduleId: string) => {
        if (isModuleAccessible(moduleId)) {
            setCurrentModuleId(moduleId);
        }
    };

    const handleNextModule = () => {
        // Mark current module as completed if it's not already
        if (currentModuleId && !completedModules.includes(currentModuleId)) {
            setCompletedModules([...completedModules, currentModuleId]);
        }

        // Find the next module
        const currentIndex = modules.findIndex(
            (m) => m._id === currentModuleId
        );
        const nextModule = modules[currentIndex + 1];

        // If there's a next module, set it as current
        if (nextModule) {
            setCurrentModuleId(nextModule._id);
        }
    };

    const handleQuizComplete = (passed: boolean) => {
        setQuizCompleted(passed);
        // TODO Add to backend
    };

    return (
        <ModuleContainer>
            {/* Sidebar */}
            <SideBar>
                <CourseTitle>
                    <Typography variant="h6">
                        {modules[0]?.course_name || "Loading..."}
                    </Typography>
                </CourseTitle>

                {modules.map((module) => {
                    const isLocked = !isModuleAccessible(module._id);
                    return (
                        <SectionItem
                            key={module._id}
                            onClick={() => handleModuleSelect(module._id)}
                            isLocked={isLocked}
                            sx={{
                                bgcolor:
                                    currentModuleId === module._id
                                        ? "action.selected"
                                        : "transparent",
                                pointerEvents: isLocked ? "none" : "auto",
                            }}
                        >
                            {completedModules.includes(module._id) ? (
                                <CheckCircleIcon color="success" />
                            ) : isLocked ? (
                                <CancelIcon color="disabled" />
                            ) : (
                                <CheckCircleIcon color="disabled" />
                            )}
                            <Typography
                                color={
                                    isLocked ? "text.disabled" : "text.primary"
                                }
                            >
                                {module.heading}
                            </Typography>
                        </SectionItem>
                    );
                })}

                <SectionItem
                    sx={{
                        mt: 2,
                        borderTop: 1,
                        borderColor: "divider",
                        opacity:
                            completedModules.length === modules.length
                                ? 1
                                : 0.5,
                        pointerEvents:
                            completedModules.length === modules.length
                                ? "auto"
                                : "none",
                    }}
                >
                    {quizCompleted ? (
                        <CheckCircleIcon color="success" />
                    ) : (
                        <CancelIcon color="disabled" />
                    )}
                    <Typography
                        color={
                            quizCompleted ? "text.primary" : "text.secondary"
                        }
                    >
                        Course Quiz
                    </Typography>
                    <QuizIcon sx={{ ml: "auto" }} />
                </SectionItem>

                <HelpButton
                    variant="contained"
                    color="primary"
                    startIcon={<HelpOutlineIcon />}
                    onClick={() => {
                        alert(
                            "Course Instructions:\n\n" +
                                "1. Read through each module carefully\n" +
                                "2. Complete modules in order - they unlock sequentially\n" +
                                "3. Click 'NEXT' at the bottom of each section\n" +
                                "4. After finishing all modules, take the course quiz\n" +
                                "5. Pass the quiz to receive your certificate\n\n" +
                                "Need more help? Contact support@lucidceu.com"
                        );
                    }}
                >
                    HELP
                </HelpButton>
            </SideBar>

            {/* Main Content */}
            <MainContent>
                {/* Progress Bar */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="body1" gutterBottom>
                        Progress - {progress}%
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 8, borderRadius: 4 }}
                    />
                </Paper>

                {/* Show quiz when all modules are completed */}
                {completedModules.length === modules.length ? (
                    <>
                        <CourseQuiz
                            courseId={modules[0]?.course_id || ""}
                            onQuizComplete={handleQuizComplete}
                        />
                    </>
                ) : (
                    /* existing module content */
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            {currentModule?.heading || "Loading..."}
                        </Typography>

                        {currentModule?.content.map((item, index) => (
                            <Box key={index} sx={{ mb: 3 }}>
                                {item.type === "text" ? (
                                    <Typography variant="body1" paragraph>
                                        {item.content}
                                    </Typography>
                                ) : (
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            {item.videoTitle}
                                        </Typography>
                                        <Box
                                            sx={{
                                                position: "relative",
                                                paddingTop: "56.25%", // 16:9 aspect ratio
                                                width: "100%",
                                                mb: 2,
                                            }}
                                        >
                                            <iframe
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    border: "none",
                                                }}
                                                src={item.videoUrl}
                                                title={item.videoTitle}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ))}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 4,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Estimated time: {currentModule?.estimated_time}{" "}
                                minutes
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<NavigateNextIcon />}
                                onClick={handleNextModule}
                            >
                                NEXT
                            </Button>
                        </Box>
                    </Paper>
                )}
            </MainContent>
        </ModuleContainer>
    );
};

export default CourseModule;
