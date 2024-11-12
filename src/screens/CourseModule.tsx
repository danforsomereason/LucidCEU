// src/screens/CourseModule.tsx
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    LinearProgress,
    styled,
    CircularProgress,
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
    _id: string;
    course_name: string;
    course_id: string;
    heading: string;
    text_content: string[];
    estimated_time: number;
    order: number;
    completed?: boolean; 
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
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    const [currentModuleId, setCurrentModuleId] = useState<string>("");

    // Fetch modules data
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const courseResponse = await fetch('http://localhost:5001/api/v1/courses/6716bd8a6ac3f9aac2507b40', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!courseResponse.ok) {
                    throw new Error(`HTTP error! status: ${courseResponse.status}`);
                }
                
                const courseData = await courseResponse.json();
                console.log('Course data:', courseData);
                
                if (!courseData.course_modules || courseData.course_modules.length === 0) {
                    console.error('No course modules found in the course data');
                    setLoading(false);
                    return;
                }

                const modulesResponse = await fetch(
                    `http://localhost:5001/api/v1/modules?ids=${courseData.course_modules.join(',')}`,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                if (!modulesResponse.ok) {
                    throw new Error(`HTTP error! status: ${modulesResponse.status}`);
                }
                
                const modulesData = await modulesResponse.json();
                console.log('Modules data:', modulesData);

                if (Array.isArray(modulesData)) {
                    const sortedModules = modulesData.sort((a: Module, b: Module) => a.order - b.order);
                    setModules(sortedModules);
                    setCurrentModuleId(sortedModules[0]?._id || "");
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course/modules:', error);
                setLoading(false);
            }
        };
        fetchModules();
    }, []);

    // Add loading state handling
    if (loading) {
        return (
            <ModuleContainer>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            </ModuleContainer>
        );
    }

    const currentModule = modules.find(m => m._id === currentModuleId);

    // Debug current module
    console.log('Current module:', currentModule);
    console.log('All modules:', modules);
    console.log('Completed modules:', completedModules);

    // Calculate progress based on completed modules
    const progress = (completedModules.length / modules.length) * 100;

    // Handle moving to next module
    const handleNextModule = () => {
        if (!currentModuleId) return;
        
        // Mark current module as complete
        if (!completedModules.includes(currentModuleId)) {
            setCompletedModules(prev => [...prev, currentModuleId]);
        }

        // Find current module index and move to next
        const currentIndex = modules.findIndex(m => m._id === currentModuleId);
        if (currentIndex < modules.length - 1) {
            setCurrentModuleId(modules[currentIndex + 1]._id);
        }
        // Could add navigation to quiz here when all modules complete
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

                {modules.map((module) => (
                    <SectionItem
                        key={module._id}
                        onClick={() => setCurrentModuleId(module._id)}
                        sx={{
                            bgcolor: currentModuleId === module._id
                                ? "action.selected"
                                : "transparent",
                        }}
                    >
                        {completedModules.includes(module._id) ? (
                            <CheckCircleIcon color="success" />
                        ) : (
                            <CancelIcon color="disabled" />
                        )}
                        <Typography
                            color={completedModules.includes(module._id)
                                ? "text.primary"
                                : "text.secondary"
                            }
                        >
                            {module.heading}
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
                        {currentModule?.heading || "Loading..."}
                    </Typography>
                    
                    {currentModule?.text_content.map((paragraph, index) => (
                        <Typography key={index} variant="body1" paragraph>
                            {paragraph}
                        </Typography>
                    ))}

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            Estimated time: {currentModule?.estimated_time} minutes
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
            </MainContent>
        </ModuleContainer>
    );
};

export default CourseModule;
