import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Layout from "./components/Layout";
import Membership from "./screens/Membership";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Courses from "./screens/Courses";
import SignUp from "./screens/SignUp";
import CourseModule from "./screens/CourseModule";
import QuizResults from "./screens/QuizResults";
import CourseDescription from "./screens/CourseDescription";
import Dashboard from "./screens/dashboard/Dashboard";
import IndividualCheckout from "./screens/signup/IndividualCheckout";
import TeamOrgSignup from "./screens/signup/TeamOrgSignup";
import EnterpriseSignup from "./screens/signup/EnterpriseSignup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { globalContext, GlobalValue } from "./context/globalContext";
import { User } from "../server/src/models/User";
import Register from "./screens/signup/Register";
import Login from "./screens/Login";
import MyAssignedCourses from "./screens/MyAssignedCourses";

const App: React.FC = () => {
    const localToken = localStorage.getItem("token");
    // console.log("localUser", localUser);

    // ?? "" removed from parse
    // changed from parseUser = JSON.parse(localUser);
    const [currentUser, setCurrentUser] = useState<User>();
    const [currentUserLoading, setCurrentUserLoading] = useState(true);

    const [token, setToken] = useState(localToken ?? undefined);
    useEffect(() => {
        async function identify() {
            if (!token) {
                setCurrentUserLoading(false);
                return;
            }
            const response = await fetch(
                "http://localhost:5001/api/v1/users/identify",
                { headers: { authorization: `Bearer ${token}` } }
            );
            const output = await response.json();
            setCurrentUser(output.user);
            setCurrentUserLoading(false);
        }
        identify();
    }, []);

    const globalValue: GlobalValue = {
        currentUser,
        setCurrentUser,
        token,
        setToken,
        currentUserLoading,
    };
    // console.log("current user", currentUser);
    const route = (
        screen: React.ReactNode,
        showNavbar: boolean = true,
        navbarStyle: "fixed" | "static" = "static"
    ) => {
        return (
            <Layout showNavbar={showNavbar} navbarStyle={navbarStyle}>
                {screen}
            </Layout>
        );
    };

    return (
        <globalContext.Provider value={globalValue}>
            <ThemeProvider theme={theme}>
                <Router>
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
                        <Route path="/signup" element={route(<SignUp />)} />
                        <Route
                            path="/signup/individual"
                            element={route(<IndividualCheckout />)}
                        />
                        <Route
                            path="/signup/team-org"
                            element={route(<TeamOrgSignup />)}
                        />
                        <Route
                            path="/signup/enterprise"
                            element={route(<EnterpriseSignup />)}
                        />
                        <Route
                            path="/course/:courseId/modules"
                            // Navbar is fixed for Module page
                            element={route(<CourseModule />, true, "fixed")}
                        />
                        <Route
                            path="/quiz-results"
                            element={route(<QuizResults />)}
                        />
                        <Route
                            path="/course/:courseId"
                            element={route(
                                <CourseDescription />,
                                true,
                                "fixed"
                            )}
                        />
                        <Route
                            path="/dashboard"
                            element={route(<Dashboard />, true, "fixed")}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/my-assigned-courses"
                            element={<MyAssignedCourses />}
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </globalContext.Provider>
    );
};

export default App;
