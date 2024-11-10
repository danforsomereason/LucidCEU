// src/screens/CourseModule.tsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    LinearProgress,
    styled,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// Constants
const DRAWER_WIDTH = 280;
const NAVBAR_HEIGHT = 84;

// Types
interface Module {
    id: number;
    title: string;
    content: string;
    completed: boolean;
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

const SectionItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const HelpButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    bottom: theme.spacing(3),
    left: theme.spacing(3),
}));

const CourseModule: React.FC = () => {
    // Sample data - replace with your actual data
    const [modules] = useState<Module[]>([
        {
            id: 1,
            title: "Intro to Course",
            content: "Content...",
            completed: true,
        },
        {
            id: 2,
            title: "Background and history",
            content: "Content...",
            completed: false,
        },
        {
            id: 3,
            title: "Understanding complex concepts in counseling",
            content: "Content...",
            completed: false,
        },
        { id: 4, title: "Quiz", content: "Content...", completed: false },
    ]);

    const [currentModuleId, setCurrentModuleId] = useState(1);

    // Calculate progress
    const progress =
        (modules.filter((m) => m.completed).length / modules.length) * 100;
    const currentModule = modules.find((m) => m.id === currentModuleId);

    return (
        <ModuleContainer>
            {/* Sidebar */}
            <SideBar>
                <CourseTitle>
                    <Typography variant="h6">
                        Name of the Course will be located here
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        by Name of Instructor
                    </Typography>
                </CourseTitle>

                {modules.map((module) => (
                    <SectionItem
                        key={module.id}
                        onClick={() => setCurrentModuleId(module.id)}
                        sx={{
                            bgcolor:
                                currentModuleId === module.id
                                    ? "action.selected"
                                    : "transparent",
                        }}
                    >
                        {module.completed ? (
                            <CheckCircleIcon color="success" />
                        ) : (
                            <CancelIcon color="disabled" />
                        )}
                        <Typography
                            color={
                                module.completed
                                    ? "text.primary"
                                    : "text.secondary"
                            }
                        >
                            {module.title}
                        </Typography>
                    </SectionItem>
                ))}

                <HelpButton
                    variant="contained"
                    color="primary"
                    startIcon={<HelpOutlineIcon />}
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

                {/* Content */}
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        HEADING - NAME OF THE COURSE SECTION
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        gutterBottom
                    >
                        {currentModule?.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Here is a paragraph of text that serves as the main
                        course content. Here, users will read relevant
                        information to learn the course material. Users will
                        learn about the topic presented. Each course will be
                        divided into sections which are like chapters...
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 4,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<NavigateNextIcon />}
                            onClick={() => {
                                const nextModule = modules.find(
                                    (m) => m.id > currentModuleId
                                );
                                if (nextModule) {
                                    setCurrentModuleId(nextModule.id);
                                }
                            }}
                        >
                            NEXT
                        </Button>
                    </Box>
                </Paper>
            </MainContent>
        </ModuleContainer>
    );
};

export default CourseModule;
