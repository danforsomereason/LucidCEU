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

const Courses: React.FC = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then((data) => {
            console.log(data);
            setCourses(data);
        });
    }, []);

    return (
        <div className="courses-grid">
            {courses.map((course: any) => (
                <CourseCard course={course} key={course._id}></CourseCard>
            ))}
        </div>
    );
};

export default Courses;
