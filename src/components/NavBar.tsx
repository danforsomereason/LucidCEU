import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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

                {/* Desktop Menu - visible only on medium and larger screens */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        gap: "75px",
                        color: "var(--white-color)",
                        border: "1px solid hsl(0, 0%, 20%)",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        backgroundColor: "hsl(0, 0%, 12%)",
                    }}
                >
                    <Typography variant="body1" onClick={() => navigate("/")}>
                        <a
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Home
                        </a>
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => navigate("/membership")}
                    >
                        <a
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Membership
                        </a>
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => navigate("/courses")}
                    >
                        <a
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Courses
                        </a>
                    </Typography>
                </Box>

                {/* Sign In Button - visible only on medium and larger screens */}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/signin")}
                    sx={{ display: { xs: "none", md: "block" } }}
                >
                    Sign In
                </Button>

                {/* Hamburger IconButton for mobile screen sizes */}
                <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    sx={{ display: { xs: "block", md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Hamburger Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem
                        onClick={() => {
                            navigate("/");
                            handleMenuClose();
                        }}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate("/membership");
                            handleMenuClose();
                        }}
                    >
                        Membership
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate("/courses");
                            handleMenuClose();
                        }}
                    >
                        Courses
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate("/signin");
                            handleMenuClose();
                        }}
                    >
                        Sign In
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
