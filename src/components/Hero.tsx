import React, { useEffect } from "react";
import "../styles/Hero.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CourseCard from "./CourseCard";
import { getCourseCategories } from "../requests/courseCategories";

const Hero: React.FC = () => {
    const courseCategories = [
        {
            categoryID: 1,
            categoryName: "Counseling Basics",
            categoryDescription:
                "Leverage the fundamentals of counseling and therapy.",
        },
        {
            categoryID: 2,
            categoryName: "Cognitive Behavioral Therapy",
            categoryDescription:
                "Master advanced techniques in CBT for impactful client work.",
        },
        {
            categoryID: 3,
            categoryName: "Group Therapy",
            categoryDescription:
                "Learn the best practices for conducting successful group therapy.",
        },
        {
            categoryID: 4,
            categoryName: "Human Resources",
            categoryDescription:
                "Ensure your team complies with HR guidelines.",
        },
        {
            categoryID: 5,
            categoryName: "Measurement-Based Care",
            categoryDescription:
                "Track and improve client outcomes using measurable care standards.",
        },
        {
            categoryID: 6,
            categoryName: "Addiction Treatment",
            categoryDescription:
                "Gain specialized knowledge in treating addiction and substance abuse.",
        },
        {
            categoryID: 7,
            categoryName: "Medical Records and HIPAA",
            categoryDescription:
                "Maintain confidentiality and compliance with medical record management.",
        },
        {
            categoryID: 8,
            categoryName: "Multicultural Theory & Diversity",
            categoryDescription:
                "Expand your knowledge and skills to work with diverse populations.",
        },
        {
            categoryID: 9,
            categoryName: "All Courses",
            categoryDescription: "Browse all available courses in our catalog.",
        },
    ];

    useEffect(() => {
        getCourseCategories().then((data) => {
            console.log(data);
        });
    }, []);

    return (
        <>
            <section className="hero-section">
                <Typography variant="h1" gutterBottom>
                    LEARN, GROW, IMPACT
                </Typography>
                <Typography variant="h2" gutterBottom>
                    <span>Impact your client work, faster.</span>
                    <br />
                    <span>Stay up-to-date and compliant.</span>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    LUCID makes training your team simple. Easily register your
                    employees to start learning and accruing Continuing
                    Education Units toward their licensure requirements. LUCID
                    stays up to date on leading research, state guidelines, and
                    accreditation standards so that you can focus on what you do
                    best: providing exceptional client care!
                </Typography>
                <Button variant="contained" color="secondary">
                    Get Started
                </Button>
            </section>
            <section className="hero-course-gallery">
                <Typography variant="h2">
                    Discover the LUCID difference
                </Typography>
                <Typography>
                    Our courses are designed to train your team effeciently with
                    the knowledge they need to succeed. LUCID makes it easy to
                    stay up-to-date on the latest research, state guidelines,
                    and accreditation standards. Simplify your training needs
                    with LUCID.
                </Typography>
                <div className="course-grid">
                    {courseCategories.map((category, index) => (
                        <CourseCard
                            key={index}
                            courseCategories={category}
                        ></CourseCard>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Hero;
