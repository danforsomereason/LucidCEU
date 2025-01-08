import React, { useEffect, useState } from "react";
import "../styles/Hero.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CategoryCard from "./CategoryCard";
import { getCourseCategories } from "../requests/courseCategories";
import { getCourses } from "../requests/courses";


const Hero: React.FC = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCourseCategories().then((data) => {
            console.log(data);
            setCategories(data);
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
            <section className="hero-category-gallery">
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
                <div className="category-grid">
                    {categories.map((category: any) => (
                        <div key={category._id}>
                            <CategoryCard courseCategory={category} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Hero;
