import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles"; // Change this from @emotion/react
import theme from "./theme";
import NavBar from "./components/NavBar";
import Membership from "./screens/Membership";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Courses from "./screens/Courses";
import SignUp from "./screens/SignUp";
import Lesson from "./screens/Lesson";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
    const route = (screen: ReactNode, showNavbar: boolean = true) => {
        return (
            <div style={{ minHeight: "100vh" }}>
                {showNavbar && <NavBar />}
                {screen}
            </div>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div style={{ minHeight: "100vh" }}>
                    <Routes>
                        <Route path="/" element={route(<Home />)} />
                        <Route
                            path="/membership"
                            element={route(<Membership />)}
                        />
                        <Route
                            path="/signin"
                            element={route(<SignIn />, false)}
                        />
                        <Route path="/courses" element={route(<Courses />)} />
                        <Route
                            path="/signup"
                            element={route(<SignUp />, false)}
                        />
                        <Route path="/lesson" element={route(<Lesson />)} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
