import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const completedCourses = ["Test Course", "Sample Course", "Beginner Course"];
const requiredCourses = [
    "Test Course",
    "Sample Course",
    "Beginner Course",
    "Advanced Test Course",
    "Intermediate Sample",
    "New Course",
];

function calculateScore(completedCourses: string[], requiredCourses: string[]) {
    const completedRequired = requiredCourses.filter((course) => {
        return completedCourses.includes(course);
    });
    const score = (completedRequired.length / requiredCourses.length) * 100;
    return score;
}

export default function BasicPie() {
    const score = calculateScore(completedCourses, requiredCourses);
    return (
        <PieChart
            slotProps={{
                legend: {
                    direction: "column",
                    position: { vertical: "middle", horizontal: "right" },
                    padding: 20,
                },
            }}
            series={[
                {
                    data: [
                        // labels? would have to track user's selection && completion of a course that matches selection
                        // values - calculation of completed courses/required courses * 100
                        { id: 0, value: 10, label: "Ethics & Legal" },
                        { id: 1, value: 15, label: "Counseling" },
                        { id: 2, value: score, label: "Human Resources" },
                    ],
                    innerRadius: 40,
                    outerRadius: "80%",
                    paddingAngle: 4,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: "5%",
                    cy: "50%",
                },
            ]}
            width={400}
            height={300}
        />
    );
}
