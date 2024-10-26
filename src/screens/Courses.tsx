import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Paper,
    CardContent,
    Card,
    Typography,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../requests/courses";
import "../styles/Courses.css";
import { set } from "mongoose";

const Courses: React.FC = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 12;

    // fetch courses from the server
    useEffect(() => {
        getCourses().then((data) => {
            console.log(data);
            setCourses(data);
            // Initially all courses are displayed
            setFilteredCourses(data);
        });
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
        setFilteredCourses(
            courses.filter((course: any) => {
                return course.course_name.toLowerCase().includes(query);
            })
        );
    };

    // Pagination logic
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(
        indexOfFirstCourse,
        indexOfLastCourse
    );

    // Handle page change
    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Box
                className="courses-hero-section"
                sx={{
                    padding: {
                        xs: "10vh 5vw",
                        sm: "15vh 10vw",
                        md: "20vh 15vw",
                    },
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" gutterBottom>
                    All the courses you need - in one place.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <Box>
                        Find the perfect course for you, whether you're looking
                        to learn a new skill, maintain your licensure, or stay
                        up to date on leading research.
                    </Box>
                    <br />
                    <Box>
                        LUCID CEU offers a wide range of courses in various
                        disciplines, including social work, counseling, and
                        nursing. We also help you cover the basics from
                        handwashing to HIPAA compliance.
                    </Box>
                </Typography>
                <Button variant="contained" color="primary`" sx={{ mt: 4 }}>
                    Browse
                </Button>
            </Box>
            <Grid className="course-grid">
                {courses.map((course: any) => (
                    <Grid item xs={12} sm={6} md={4} key={course._id}>
                        <CourseCard course={course}></CourseCard>
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={Math.ceil(filteredCourses.length / coursesPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </>
    );
};

export default Courses;
