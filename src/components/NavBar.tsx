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
import { globalContext } from "../context/globalContext";
import { useContext } from "react";

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const context = useContext(globalContext);
    // need to get the token out of the context as opposed to the localStorage
    const token = localStorage.getItem("token");
    const userName = context?.currentUser?.first_name || "Welcome Back!";

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // should also be reset in the context to be undefined
        localStorage.removeItem("token");
        handleMenuClose();
        navigate("/");
    };

    const publicMenuItems = [
        { label: "Home", path: "/" },
        { label: "Membership", path: "/membership" },
        { label: "Courses", path: "/courses" },
    ];

    const authenticatedMenuItems = [
        { label: "Home", path: "/" },
        { label: "Dashboard", path: "/dashboard" },
        { label: "Courses", path: "/courses" },
    ];

    const menuItems = token ? authenticatedMenuItems : publicMenuItems;

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

                {!token ? (
                    <>
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
                            {menuItems.map((item) => (
                                <Typography
                                    key={item.path}
                                    variant="body1"
                                    onClick={() => navigate(item.path)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    {item.label}
                                </Typography>
                            ))}
                        </Box>
                        {/* Sign in button for not-signed-in user */}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate("/signin")}
                            sx={{ display: { xs: "none", md: "block" } }}
                        >
                            Sign In
                        </Button>
                    </>
                ) : (
                    // User info and menu button when logged in
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ color: "var(--white-color)" }}>
                            {userName}
                        </Typography>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                )}

                {/* Mobile menu button - Only show when not logged in */}
                {!token && (
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Menu (for both mobile and logged-in users) */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                '&[aria-hidden="true"]': {
                                    visibility: "hidden",
                                    display: "none",
                                },
                            },
                        },
                    }}
                >
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                handleMenuClose();
                            }}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                    {token ? (
                        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {
                                navigate("/signin");
                                handleMenuClose();
                            }}
                        >
                            Sign In
                        </MenuItem>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
