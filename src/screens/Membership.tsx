import React from "react";
import {
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Paper,
    Container,
} from "@mui/material";

const coursePackages = [
    {
        title: "Clinical Skills Package",
        description:
            "20 CEU hours including ethics, suicide risk assessment, and counseling topics to satisfy most states' continuing education requirements for counselors.",
    },
    {
        title: "Human Resources Basics",
        description:
            "Find necessary trainings for your HR needs. Includes Handwashing, TB, Cultural Diversity/Equity/Inclusion, Sexual Harassment, and more to ensure your HR team is up-to-date.",
    },
    {
        title: "Confidentiality & Privacy Package",
        description:
            "42 CFR, HIPAA, and other confidentiality regulations critical to patient privacy and legal compliance.",
    },
];

const Membership: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Typography
                className="membership-header"
                variant="h2"
                align="center"
                pt={3}
                sx={{ fontWeight: "bold" }}
                gutterBottom
            >
                Membership Options
            </Typography>

            {/* Team Training & Flagship */}
            <Card className="membership-card" sx={{ marginBottom: "30px" }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Team Training
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        $42 per employee/year
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Invest in your team and gain access to all LUCID's
                        trainings. Enhance your team's skills and ensure
                        compliance with the latest continuing education
                        requirements.
                    </Typography>
                    <Button variant="contained" color="primary">
                        Get Started
                    </Button>
                </CardContent>
            </Card>

            {/* Course Packages Section */}
            <Typography variant="h3" gutterBottom>
                Course Packages
            </Typography>
            <Grid container spacing={4}>
                {coursePackages.map((coursePackage, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Paper
                            className="membership-paper"
                            sx={{ p: "20px", height: "100%" }}
                            elevation={6}
                        >
                            <Typography variant="h5" gutterBottom>
                                {coursePackage.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ mb: 3 }}
                                gutterBottom
                            >
                                {coursePackage.description}
                            </Typography>
                            <Button variant="outlined" color="primary">
                                Learn More
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Card
                className="membership-card"
                sx={{ marginTop: "30px", marginBottom: "30px" }}
            >
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Individual Training
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        $100/year
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Get unlimited access to all LUCID trainings to meet your
                        state's CEU requirements. Perfect for individual
                        professionals looking to stay compliant.
                    </Typography>
                    <Button variant="contained" color="primary">
                        Sign Up
                    </Button>
                </CardContent>
            </Card>

            {/* Individual Course Access */}
            <Card className="membership-card" sx={{ marginBottom: "30px" }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Individual Course Access
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Make a one-time payment for access to a specific course
                        you need. Perfect for completing targeted training
                        without the full membership commitment.
                    </Typography>
                    <Button variant="contained" color="primary">
                        Browse Courses
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Membership;
