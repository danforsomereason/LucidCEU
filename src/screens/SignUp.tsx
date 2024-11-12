import React, { useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Box,
    Paper,
    Stack,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { createUser } from "../requests/user";

interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isOrganization: boolean;
    organizationName?: string;
}

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isOrganization: false,
        organizationName: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "isOrganization" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you'll add your API call to register the user
        const userData = {
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
        };
        const response = await createUser(userData, formData.password);
        console.log(response);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "#f5f5f5", // Light gray background
                py: 4,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "white", // White background for the form
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    sx={{ color: "#2c3e50" }} // Dark blue-gray color for heading
                >
                    Sign Up
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Box>

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.isOrganization}
                                    onChange={handleChange}
                                    name="isOrganization"
                                    sx={{
                                        color: "#3f51b5", // Primary blue color for checkbox
                                        "&.Mui-checked": {
                                            color: "#3f51b5",
                                        },
                                    }}
                                />
                            }
                            label="I am registering an organization"
                        />

                        {formData.isOrganization && (
                            <TextField
                                label="Organization Name"
                                name="organizationName"
                                value={formData.organizationName}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                            />
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 2,
                                bgcolor: "#3f51b5", // Primary blue
                                "&:hover": {
                                    bgcolor: "#303f9f", // Darker blue on hover
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default SignUp;
