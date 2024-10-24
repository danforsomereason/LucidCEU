import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import Hero from "./Hero";

const CategoryCard: React.FC<any> = ({ courseCategory }) => {
    return (
        <Card className="category-card">
            <CardHeader
                className="category-card-header"
                title={courseCategory.category_name}
            />
            <CardContent className="category-card-content">
                <p>{courseCategory.category_description}</p>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;
