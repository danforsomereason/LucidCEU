import { useContext } from "react";
import { globalContext } from "../context/globalContext";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Dashboard: React.FC = () => {
    const context = useContext(globalContext);
    const userName = context?.currentUser?.first_name;

    if (!context || !context.currentUser) {
        return <Navigate to="/signin" />;
    }

    return (
        <DashboardLayout>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h5">
                            Welcome back, {userName}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default Dashboard;
