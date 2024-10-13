import React from "react";
import {
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Container,
} from "@mui/material";
import "../styles/Membership.css";

const Membership: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Typography
                className="membership-header"
                variant="h2"
                align="center"
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
                <Grid item xs={12} sm={6}>
                    <Card className="membership-card">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Clinical Skills Package
                            </Typography>
                            <Typography variant="body1">
                                20 CEU hours including ethics, suicide risk
                                assessment, and counseling topics to satisfy
                                most states' continuing education requirements
                                for counselors.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card className="membership-card">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Human Resources Basics
                            </Typography>
                            <Typography variant="body1">
                                Handwashing, TB, Cultural
                                Diversity/Equity/Inclusion, Sexual Harassment,
                                and more to ensure your HR team is up-to-date.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card className="membership-card">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Confidentiality & Privacy Package
                            </Typography>
                            <Typography variant="body1">
                                42 CFR, HIPAA, and other confidentiality
                                regulations critical to patient privacy and
                                legal compliance.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
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
