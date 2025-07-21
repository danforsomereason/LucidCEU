import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid,
    Skeleton,
    useTheme,
    useMediaQuery,
    Container,
    Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CourseDescription.css";
import { globalContext } from "../context/globalContext";

interface Course {
    _id: string;
    course_name: string;
    ce_hours: number;
    course_description: string;
    course_instructor: string;
    learning_objectives: string[];
}

const CourseDescription: React.FC = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const global = useContext(globalContext);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5001/api/v1/courses/${courseId}`
                );

                if (!response.ok) throw new Error("Course not found");
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        if (courseId) fetchCourse();
    }, [courseId]);

    const handleBeginCourse = async () => {
        const authorization = `Bearer ${global?.token}`;
        const headers = { authorization };

        const init = { method: "POST", headers };
        const response = await fetch(
            `http://localhost:5001/api/v1/assigned_courses/${courseId}`,
            init
        );
        if (response.status === 409) {
            console.log("Course already assigned. Proceeding to modules.");
        } else if (!response.ok) throw new Error("Course not found");

        const data = await response.json();
        console.log("Data - Assigned Course Response", data);

        navigate(`/course/${courseId}/modules`, {
            state: {
                courseId: course?._id,
                courseName: course?.course_name,
            },
        });
    };

    if (!course) {
        return (
            <Box className="course-description-container">
                <Container sx={{ pt: "64px" }}>
                    <Skeleton variant="rectangular" height={200} />
                </Container>
            </Box>
        );
    }

    return (
        <Box
            className="course-description-container"
            sx={{
                minHeight: "calc(100vh - 64px)",
                pt: "84px",
                pb: 4,
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Left Column */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                color: "white",
                                position: "sticky",
                                top: "84px",
                            }}
                        >
                            <Typography variant="h2" gutterBottom>
                                {course.course_name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mt: 4,
                                    lineHeight: 1.8,
                                    fontSize: "1.1rem",
                                }}
                            >
                                {course.course_description}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                position: "sticky",
                                top: "84px",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="overline"
                                            color="textSecondary"
                                        >
                                            CE Hours
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            color="primary"
                                        >
                                            {course.ce_hours}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="overline"
                                            color="textSecondary"
                                        >
                                            Taught By
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                        >
                                            {course.course_instructor}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{ mt: 4 }}
                                >
                                    What You'll Learn
                                </Typography>
                                <List>
                                    {course.learning_objectives.map(
                                        (objective, index) => (
                                            <ListItem
                                                key={index}
                                                sx={{ pl: 0 }}
                                            >
                                                <ListItemIcon
                                                    sx={{ minWidth: 40 }}
                                                >
                                                    <CheckCircleIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={objective}
                                                />
                                            </ListItem>
                                        )
                                    )}
                                </List>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleBeginCourse}
                                    fullWidth
                                    sx={{
                                        mt: 4,
                                        py: 1.5,
                                        fontWeight: 600,
                                        boxShadow:
                                            "0 4px 12px rgba(0, 0, 0, 0.15)",
                                        fontSize: "1.1rem",
                                        textTransform: "none",
                                    }}
                                >
                                    Begin Course
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CourseDescription;
