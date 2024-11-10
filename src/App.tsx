import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Layout from "./components/Layout";
import Membership from "./screens/Membership";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Courses from "./screens/Courses";
import SignUp from "./screens/SignUp";
import Lesson from "./screens/Lesson";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
    const route = (
        screen: React.ReactNode, 
        showNavbar: boolean = true,
        navbarStyle: 'fixed' | 'static' = 'static'
    ) => {
        return (
            <Layout 
                showNavbar={showNavbar}
                navbarStyle={navbarStyle}
            >
                {screen}
            </Layout>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={route(<Home />)} />
                    <Route path="/membership" element={route(<Membership />)} />
                    <Route path="/signin" element={route(<SignIn />, false)} />
                    <Route path="/courses" element={route(<Courses />)} />
                    <Route path="/signup" element={route(<SignUp />, false)} />
                    <Route 
                        path="/lesson" 
                        element={route(<Lesson />, true, 'fixed')}  // Set navbar to fixed for Lesson page
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
