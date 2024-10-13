import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import Hero from "./Hero";

const CourseCard: React.FC<any> = ({ courseCategories }) => {
    return (
        <Card className="course-card">
            <CardHeader
                className="course-card-header"
                title={courseCategories.categoryName}
            />
            <CardContent className="course-card-content">
                <p>{courseCategories.categoryDescription}</p>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
