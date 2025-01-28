import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
    return (
        <PieChart
            series={[
                {
                    data: [
                        // labels? would have to track user's selection && completion of a course that matches selection
                        // values - calculation of completed courses/required courses * 100
                        { id: 0, value: 10, label: "Ethics & Legal" },
                        { id: 1, value: 15, label: "Counseling" },
                        { id: 2, value: 60, label: "Human Resources" },
                    ],
                    innerRadius: 30,
                    outerRadius: '80%',
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: '40%',
                    cy: '50%',
                },
            ]}
            width={400}
            height={300}
        />
    );
}
