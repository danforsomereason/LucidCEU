import React, { useState } from "react";
import { Button, TextField, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../requests/user";

interface SignUpFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignUpFormData>({
        email: "",
        password: "",
    });

    const handleSignIn = async () => {
        await login(formData.email, formData.password);
        navigate("/dashboard");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: "0 20px",
                backgroundColor: "var(--white-color)",
                color: "var(--black-color)",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    textAlign: "center",
                    backgroundColor: "hsl(0, 0%, 98%)",
                    padding: "40px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Link
                    onClick={() => {
                        navigate("/");
                    }}
                    variant="h4"
                    sx={{
                        marginBottom: "20px",
                        color: "var(--secondary-color)",
                        fontSize: "2.75rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "none",
                    }}
                >
                    LUCID
                </Link>

                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: "20px",
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
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: "20px",
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

                <Button
                    onClick={handleSignIn}
                    variant="contained"
                    fullWidth
                    sx={{
                        padding: "15px 30px",
                        backgroundColor: "var(--secondary-color)",
                        color: "var(--white-color)",
                        "&:hover": {
                            backgroundColor: "var(--primary-color)",
                        },
                    }}
                >
                    Sign In
                </Button>

                <Typography
                    variant="body1"
                    sx={{ marginTop: "20px", color: "var(--black-color)" }}
                >
                    Don’t have an account?{" "}
                    <Link
                        onClick={() => {
                            navigate("/signup");
                        }}
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
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default SignIn;
