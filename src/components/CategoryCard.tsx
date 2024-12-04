import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from 'react-router-dom';
import React from "react";

interface CategoryCardProps {
    courseCategory: {
        _id: string;
        category_name: string;
        category_description: string;
    };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ courseCategory }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/courses?tag=${encodeURIComponent(courseCategory.category_name)}`);
    };

    return (
        <Card className="category-card">
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    className="category-card-header"
                    title={courseCategory.category_name}
                />
                <CardContent className="category-card-content">
                    <p>{courseCategory.category_description}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CategoryCard;
