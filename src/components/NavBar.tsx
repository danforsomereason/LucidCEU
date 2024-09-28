import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: "var(--black-color)", padding: "10px 20px" }}
        >
            <Toolbar
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <Typography
                    variant="h4"
                    onClick={() => {
                        navigate("/");
                    }}
                    sx={{
                        color: "var(--secondary-color)",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    LUCID
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "75px",
                        color: "var(--white-color)",
                        border: "1px solid hsl(0, 0%, 20%)",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        backgroundColor: "hsl(0, 0%, 12%)",
                    }}
                >
                    <Typography
                        variant="body1"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <a
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Home
                        </a>
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => {
                            navigate("/pricing");
                        }}
                    >
                        <a
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Pricing
                        </a>
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => {
                            navigate("/courses");
                        }}
                    >
                        <a
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Courses
                        </a>
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        navigate("/signin");
                    }}
                >
                    Sign In
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
