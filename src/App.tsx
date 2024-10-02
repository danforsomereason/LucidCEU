import React, { ReactNode } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import NavBar from "./components/NavBar";
import Pricing from "./screens/Pricing";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Courses from "./screens/Courses";
import SignUp from "./screens/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
    const route = (screen: ReactNode, showNavbar: boolean = true) => {
        return (
            <div>
                {showNavbar && <NavBar />}
                {screen}
            </div>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={route(<Home />)} />
                        <Route path="/pricing" element={route(<Pricing />)} />
                        <Route
                            path="/signin"
                            element={route(<SignIn />, false)}
                        />
                        <Route path="/courses" element={route(<Courses />)} />
                        <Route
                            path="/signup"
                            element={route(<SignUp />, false)}
                        />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default App;
