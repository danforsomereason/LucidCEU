import { useContext } from "react";
import { globalContext } from "../../context/globalContext";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BasicPie from "../../components/dashboard/UserCompliance";


// Pie chart will show completed course / required course * 100
// If the user belongs to an organization, the org will determine required courses
// The organization admin has to select the required courses
// Different roles within the organization will have different requirements (e.g. Nurse, counselor, social worker)
// Interface for admins to add courses
// MongoDB will need a way to update courses
// Seperate workflow for adding courses on new page
// An instructor can create and assign courses for users in their org, but those created courses are only available to those in the org
// If the user does not belong to an organization, they will choose their own required courses - their state tag will prioritize which courses they are recommended
// If the user (or organization) has not assigned required courses, the pie chart will instead render a message stating "Please add required courses to track your progress"
// Suggested courses based on state & all tags
// List of courses - will have Start, Resume, or Retake
// Optional - button with inverted colors - buttons determined by user course progress (Passed quiz && within 1 year; if progress < 0 - resume; else start)
// List of certificates - for course that have been completed

const Dashboard: React.FC = () => {
    const context = useContext(globalContext);
    const userName = context?.currentUser?.first_name;

    if (!context || !context.currentUser) {
        return <Navigate to="/signin" />;
    }

    return (
        <DashboardLayout>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 9, md: 6 }}>
                    <Paper
                        sx={{
                            p: 2,
                            height: "100%",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Required Courses
                        </Typography>
                        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: "300px", width: '100%' }}>
                            <BasicPie />
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 9, md: 6 }}>
                    <Paper
                        sx={{
                            p: 2,
                            height: "100%",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Required Courses
                        </Typography>
                        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: "300px" }}>
                            <BasicPie />
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 9, md: 6 }}>
                    <Paper
                        sx={{
                            p: 2,
                            height: "100%",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Required Courses
                        </Typography>
                        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: "300px" }}>
                            <BasicPie />
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 9, md: 6 }}>
                    <Paper
                        sx={{
                            p: 2,
                            height: "100%",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Required Courses
                        </Typography>
                        <Box sx={{ flexGrow: 1, position: 'relative', minHeight: "300px" }}>
                            <BasicPie />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default Dashboard;
