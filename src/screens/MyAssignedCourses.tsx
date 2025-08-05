import { useEffect, useState, useContext } from "react";
import {
    RelatedAssignedCourse,
    RelatedAssignedCourseZod,
} from "../../server/src/models/AssignedCourse";
import { globalContext } from "../context/globalContext";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import VirtualList, { VirtualListItem } from "../components/VirtualList";

export default function MyAssignedCourses() {
    const [courses, setCourses] = useState<RelatedAssignedCourse[]>([]);
    const [loading, setLoading] = useState(false);
    const global = useContext(globalContext);

    useEffect(() => {
        setLoading(true);
        async function download() {
            try {
                const response = await fetch(
                    "http://localhost:5001/api/v1/assigned_courses/titles",
                    {
                        headers: { authorization: `Bearer ${global?.token}` },
                    }
                );
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(
                        err.message || "Failed to fetch assigned courses"
                    );
                }

                // unknown is like any - anything can be assigned to it
                // but nothing can be done with it
                const data: unknown = await response.json();
                const myCourses = RelatedAssignedCourseZod.array().parse(data);
                setCourses(myCourses);
            } catch (error) {
                console.error(
                    "Failed to fetch or parse assigned courses:",
                    error
                );
                setCourses([]);
            } finally {
                setLoading(false);
            }
        }
        download();
    }, []);

    const virtualListItems: VirtualListItem[] = courses.map((course) => ({
        id: course.course_id._id,
        title: course.course_id.course_name,
        originalCourse: course, // Keep reference to original data
    }));

    // Styled Components
    const ModuleContainer = styled(Box)({
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    });

    const VirtualListContainer = styled(Box)({
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
    });

    const handleCourseClick = (item: VirtualListItem) => {
        console.log("Starting course:", item.title);
    };

    if (loading) {
        return (
            <DashboardLayout>
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
            </DashboardLayout>
        );
    }

    if (courses.length === 0) {
        return (
            <DashboardLayout>
                <ModuleContainer>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            No assigned courses found
                        </Typography>
                    </Box>
                </ModuleContainer>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <h2>My Assigned Courses:</h2>
            <VirtualList
                items={virtualListItems}
                height={600}
                itemSize={70}
                buttonText="Start"
                onItemClick={handleCourseClick}
                maxWidth={800}
            />
        </DashboardLayout>
    );
}
