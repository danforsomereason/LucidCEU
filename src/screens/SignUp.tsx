import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Typography,
    Box,
    Paper,
    Stack,
    FormControlLabel,
    Checkbox,
    Link
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
    const navigate = useNavigate();
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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: "0 20px",
                backgroundColor: "var(--white-color)",
                color: "var(--black-color)",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                    textAlign: "center",
                    backgroundColor: "hsl(0, 0%, 98%)",
                    padding: "40px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Link
                    onClick={() => navigate("/")}
                    variant="h4"
                    sx={{
                        marginBottom: "20px",
                        color: "var(--secondary-color)",
                        fontSize: "2.75rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "none",
                        display: "block",
                    }}
                >
                    LUCID
                </Link>

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
                                sx={{
                                    backgroundColor: "hsl(0, 0%, 95%)",
                                    input: { color: "var(--black-color)" },
                                    label: { color: "var(--black-color)" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "var(--primary-color)",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "var(--secondary-color)",
                                        },
                                    },
                                }}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                sx={{
                                    backgroundColor: "hsl(0, 0%, 95%)",
                                    input: { color: "var(--black-color)" },
                                    label: { color: "var(--black-color)" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "var(--primary-color)",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "var(--secondary-color)",
                                        },
                                    },
                                }}
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
                            sx={{
                                backgroundColor: "hsl(0, 0%, 95%)",
                                input: { color: "var(--black-color)" },
                                label: { color: "var(--black-color)" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "var(--primary-color)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "var(--secondary-color)",
                                    },
                                },
                            }}
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
                            sx={{
                                backgroundColor: "hsl(0, 0%, 95%)",
                                input: { color: "var(--black-color)" },
                                label: { color: "var(--black-color)" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "var(--primary-color)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "var(--secondary-color)",
                                    },
                                },
                            }}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.isOrganization}
                                    onChange={handleChange}
                                    name="isOrganization"
                                    sx={{
                                        color: "var(--primary-color)",
                                        "&.Mui-checked": {
                                            color: "var(--secondary-color)",
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
                                sx={{
                                    backgroundColor: "hsl(0, 0%, 95%)",
                                    input: { color: "var(--black-color)" },
                                    label: { color: "var(--black-color)" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "var(--primary-color)",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "var(--secondary-color)",
                                        },
                                    },
                                }}
                            />
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                padding: "15px 30px",
                                backgroundColor: "var(--secondary-color)",
                                color: "var(--white-color)",
                                "&:hover": {
                                    backgroundColor: "var(--primary-color)",
                                },
                            }}
                        >
                            Register
                        </Button>

                        <Typography
                            variant="body1"
                            sx={{ marginTop: "20px", color: "var(--black-color)" }}
                        >
                            Already have an account?{" "}
                            <Link
                                onClick={() => navigate("/signin")}
                                sx={{
                                    textDecoration: "none",
                                    color: "var(--secondary-color)",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        color: "var(--primary-color)",
                                    },
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default SignUp;
