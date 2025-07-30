import { useEffect, useState, useContext } from "react";
import {
    RelatedAssignedCourse,
    RelatedAssignedCourseZod,
} from "../../server/src/models/AssignedCourse";
import { globalContext } from "../context/globalContext";
import { Box, CircularProgress, styled } from "@mui/material";

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

    // Styled Components
    const ModuleContainer = styled(Box)({
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    });

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

    return (
        <ol>
            {courses.map((course) => (
                <li key={course.course_id._id}>
                    <p>{course.course_id.course_name}</p>
                    <button>Continue</button>
                </li>
            ))}
        </ol>
    );
}
