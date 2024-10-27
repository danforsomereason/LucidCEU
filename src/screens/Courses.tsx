import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Paper,
    CardContent,
    Card,
    Divider,
    FormGroup,
    Typography,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormControlLabel,
    Checkbox,
    Box,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../requests/courses";
import "../styles/Courses.css";
import { set } from "mongoose";

const topics = [
    "Confidentiality",
    "Treatment",
    "Ethics & Legal",
    "Substance Abuse",
    "Mental Health",
    "Human Resources",
];

const licenseTypes = ["Counseling (NBCC) CEUs", "SW CEUs", "Nursing CEUs"];

const Courses: React.FC = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedLicenseTypes, setSelectedLicenseTypes] = useState<string[]>(
        []
    );
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

    // Update filtered courses based on search, topics, and license types
    useEffect(() => {
        let results = courses.filter((course: any) => {
            const matchesSearch = course.course_name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesTopic = selectedTopics.length
                ? selectedTopics.includes(course.topic)
                : true;
            const matchesLicense = selectedLicenseTypes.length
                ? selectedLicenseTypes.includes(course.license_type)
                : true;

            return matchesSearch && matchesTopic && matchesLicense;
        });
        setFilteredCourses(results);
        setCurrentPage(1); // Reset to first page when filters change
    }, [search, selectedTopics, selectedLicenseTypes, courses]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleTopicChange = (topic: string) => {
        setSelectedTopics((prev) =>
            prev.includes(topic)
                ? prev.filter((t) => t !== topic)
                : [...prev, topic]
        );
    };

    const handleLicenseTypeChange = (type: string) => {
        setSelectedLicenseTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
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
                <Button variant="contained" color="primary" sx={{ mt: 4 }}>
                    Browse
                </Button>
            </Box>

            <Box>
                {/* Filter and sorting controls section */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        padding: "0 5vw",
                        mt: 2,
                        mb: 4,
                    }}
                >
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={search}
                        onChange={handleSearch}
                        sx={{
                            mt: 2,
                            width: "100%",
                            backgroundColor: "var(--white-color)",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--color-indigo-250)",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--color-indigo-450)",
                            },
                        }}
                        defaultValue="recommended"
                    />
                    <FormControl variant="outlined">
                        <InputLabel sx={{ color: "var(--color-indigo-450)" }}>
                            Sort By
                        </InputLabel>
                        <Select
                            label="Sort By"
                            defaultValue="recommended"
                            sx={{
                                backgroundColor: "var(--white-color)",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-indigo-250)",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-indigo-450)",
                                },
                            }}
                        >
                            <MenuItem value="recommended">Recommended</MenuItem>
                            <MenuItem value="free">Free</MenuItem>
                            <MenuItem value="length-CE-hours-desc">
                                CE Hours High to Low
                            </MenuItem>
                            <MenuItem value="length-CE-hours-asc">
                                CE Hours Low to High
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="secondary">
                        Clear Filters
                    </Button>
                </Box>
                {/* Sidebar and Mapped Courses side-by-side */}
                <Box sx={{ display: "flex", padding: "0 5vw" }}>
                    {/* Sidebar */}
                    <Box
                sx={{
                    width: "20%",
                    paddingRight: "2rem",
                    display: { xs: "none", md: "block" },
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Filter
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="subtitle1">Topic</Typography>
                <FormGroup>
                    {topics.map((topic) => (
                        <FormControlLabel
                            key={topic}
                            control={
                                <Checkbox
                                    checked={selectedTopics.includes(topic)}
                                    onChange={() => handleTopicChange(topic)}
                                />
                            }
                            label={topic}
                        />
                    ))}
                </FormGroup>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    License Type
                </Typography>
                <FormGroup>
                    {licenseTypes.map((type) => (
                        <FormControlLabel
                            key={type}
                            control={
                                <Checkbox
                                    checked={selectedLicenseTypes.includes(
                                        type
                                    )}
                                    onChange={() =>
                                        handleLicenseTypeChange(type)
                                    }
                                />
                            }
                            label={type}
                        />
                    ))}
                </FormGroup>
            </Box>

                    {/* Mapped Courses & Pagination */}
                    <Box>
                        <Grid className="course-grid">
                            {courses.map((course: any) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={course._id}
                                >
                                    <CourseCard course={course}></CourseCard>
                                </Grid>
                            ))}
                        </Grid>
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Pagination
                                count={Math.ceil(
                                    filteredCourses.length / coursesPerPage
                                )}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="secondary"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Courses;
