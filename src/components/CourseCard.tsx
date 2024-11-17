import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import React from "react";

interface CategoryCardProps {
    courseCategory: {
      _id: string;
      category_name: string;
      category_description: string;
    };
    onClick: (categoryId: string) => void;
  }
  

const CourseCard: React.FC<any> = ({ course }) => {
    return (
        <Card className="course-card">
            <CardHeader
                className="course-card-header"
                title={course.course_name}
            />
            <CardContent className="course-card-content">
                <p>{course.course_description}</p>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
