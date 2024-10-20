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

const coursesData = [
{id: 1, title: "Understanding 42 CFR Confidentiality Regulations", description: "This course provides an in-depth exploration of the federal confidentiality laws outlined in 42 CFR Part 2, which protect the privacy of individuals receiving mental health or substance abuse treatment. Participants will gain a comprehensive understanding of the legal framework, including the scope of protections, the conditions under which information can be disclosed, and the penalties for non-compliance. The training will emphasize real-world application in treatment settings, covering scenarios like patient consent, disclosures during emergencies, and reporting requirements.", price: 60},
{id: 2, }
]


const Courses: React.FC = () => {
    return (
        <div>
            <h1>Courses</h1>
        </div>
    );
};

export default Courses;
