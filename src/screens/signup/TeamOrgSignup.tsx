import React, { useState } from "react";
import {
    Box,
    Typography,
    Slider,
    Button,
    Container,
    Grid,
    Card,
    TextField,
    FormControlLabel,
    Radio,
    RadioGroup,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SchoolIcon from "@mui/icons-material/School";
import UpdateIcon from "@mui/icons-material/Update";
import GavelIcon from "@mui/icons-material/Gavel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WorkIcon from "@mui/icons-material/Work";
import { format, addYears } from "date-fns";
import DownloadIcon from '@mui/icons-material/Download';
import CreateIcon from '@mui/icons-material/Create';
import OnboardingIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

interface UserFormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    license_type: string;
    has_organization: boolean;
}

const steps = ["Account Details", "Payment Information", "Review"];

const LICENSE_TYPES = [
    "Mental Health Counselor (e.g., LPC, LMHC)",
    "Social Worker",
    "Marriage & Family Therapist",
    "Licensed Drug and Alcohol Counselor (e.g., LADAC, LCDC)",
    "Nurse",
    "Psychologist",
    "MD, DO, NP, PA",
    "Other",
    "Not Applicable",
] as const;

const TeamOrgSignup: React.FC = () => {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState<number>(2);
    const [adminCount, setAdminCount] = useState<number>(1);
    const isTeam = userCount <= 10;
    const pricePerUser = isTeam ? 50 : 45;
    const pricePerAdmin = 20;

    const handleAddAdmin = () => {
        setAdminCount((prev) => prev + 1);
    };

    const handleRemoveAdmin = () => {
        if (adminCount <= 1) return; // Prevent going below 1 admin
        setAdminCount((prev) => prev - 1);
    };

    // Generate marks for slider (every 10 users)
    const marks = Array.from({ length: 10 }, (_, i) => ({
        value: (i + 1) * 10,
        label: i === 9 ? "100" : "",
    }));
    marks.unshift({ value: 2, label: "2" }); // Add starting point

    const teamFeatures = [
        {
            text: "Cover your team's training needs",
            icon: <SchoolIcon color="primary" />,
        },
        {
            text: "Keep up to date with leading research",
            icon: <UpdateIcon color="primary" />,
        },
        {
            text: "Stay compliant with state and federal regulations",
            icon: <GavelIcon color="primary" />,
        },
        {
            text: "Track user progress and development",
            icon: <AssessmentIcon color="primary" />,
        },
        {
            text: "Boost Employee Recruitment and Retention",
            icon: <WorkIcon color="primary" />,
        },
    ];

    const calculateTotalPrice = () => {
        const userTotal = userCount * pricePerUser;
        const adminTotal = (adminCount - 1) * pricePerAdmin;
        return {
            userTotal,
            adminTotal,
            total: userTotal + adminTotal,
        };
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Left side - Order Summary & Enterprise CTA */}
                <Grid item xs={12} md={3}>
                    <Card sx={{ p: 3, bgcolor: "background.paper", mb: 3 }}>
                        <Typography
                            variant="h6"
                            sx={{ mb: 3, fontWeight: 600 }}
                        >
                            Order Summary
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 2,
                                }}
                            >
                                <Typography color="text.secondary">
                                    {userCount} Users{" "}
                                    {isTeam
                                        ? "(Team Plan)"
                                        : "(Organization Plan)"}
                                </Typography>
                                <Typography>
                                    ${userCount * pricePerUser}/year
                                </Typography>
                            </Box>
                            {adminCount > 1 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 2,
                                    }}
                                >
                                    <Typography color="text.secondary">
                                        Additional Admins ({adminCount - 1})
                                    </Typography>
                                    <Typography>
                                        ${pricePerAdmin} × {adminCount - 1} = $
                                        {(adminCount - 1) * pricePerAdmin}
                                    </Typography>
                                </Box>
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 2,
                                }}
                            >
                                <Typography color="text.secondary">
                                    Duration
                                </Typography>
                                <Typography>
                                    {format(new Date(), "MM/dd/yyyy")} -{" "}
                                    {format(
                                        addYears(new Date(), 1),
                                        "MM/dd/yyyy"
                                    )}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    pt: 2,
                                    borderTop: 1,
                                    borderColor: "divider",
                                }}
                            >
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6" color="primary">
                                    ${calculateTotalPrice().total}/year
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2, textAlign: "center" }}
                            >
                                {userCount} users at ${pricePerUser}/user/year
                                {adminCount > 1 &&
                                    ` + ${adminCount - 1} additional admin${
                                        adminCount - 1 > 1 ? "s" : ""
                                    } at $${pricePerAdmin}/admin/year`}
                            </Typography>
                        </Box>
                    </Card>

                    {/* Upgrade button */}
                    <Box sx={{ mt: 4 }}>
                        <Card sx={{ 
                            background: 'linear-gradient(135deg, var(--secondary-color) 20%, var(--primary-color) 80%)',
                            color: 'white',
                            p: 3,
                            mb: 2,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                Need more enterprise features?
                            </Typography>
                            <Grid container spacing={2}>
                                {[
                                    { icon: <DownloadIcon />, text: 'Downloadable Reports' },
                                    { icon: <CreateIcon />, text: 'Create Your Own Courses' },
                                    { icon: <OnboardingIcon />, text: 'Onboarding Program' },
                                    { icon: <PaymentIcon />, text: 'Payment Plans' },
                                ].map((feature, index) => (
                                    <Grid item xs={6} key={index}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{ color: 'white', mr: 1 }}>
                                                {feature.icon}
                                            </Box>
                                            <Typography variant="body2">
                                                {feature.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => navigate("/signup/enterprise")}
                                sx={{
                                    mt: 2,
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                Explore Enterprise Options
                            </Button>
                        </Card>
                    </Box>
                </Grid>

                {/* Middle - Signup Form */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Organization Details
                        </Typography>

                        <Box component="form" noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Organization Name"
                                        name="organization_name"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="First Name"
                                        name="first_name"
                                        autoComplete="given-name"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Last Name"
                                        name="last_name"
                                        autoComplete="family-name"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Confirm Password"
                                        name="confirm_password"
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>
                                            Your License Type
                                        </InputLabel>
                                        <Select
                                            name="license_type"
                                            label="License Type"
                                        >
                                            {LICENSE_TYPES.map((license) => (
                                                <MenuItem
                                                    key={license}
                                                    value={license}
                                                >
                                                    {license}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <Typography variant="subtitle1">
                                            Additional Administrators
                                        </Typography>
                                        <IconButton
                                            onClick={handleRemoveAdmin}
                                            disabled={adminCount <= 1}
                                            sx={{
                                                ml: 2,
                                                bgcolor: "primary.main",
                                                color: "white",
                                                "&:hover": {
                                                    bgcolor: "primary.dark",
                                                },
                                                "&.Mui-disabled": {
                                                    bgcolor: "grey.300",
                                                    color: "grey.500",
                                                },
                                                width: 36,
                                                height: 36,
                                            }}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ mx: 2 }}>
                                            {adminCount}
                                        </Typography>
                                        <IconButton
                                            onClick={handleAddAdmin}
                                            sx={{
                                                bgcolor: "primary.main",
                                                color: "white",
                                                "&:hover": {
                                                    bgcolor: "primary.dark",
                                                },
                                                width: 36,
                                                height: 36,
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        First admin is included, additional
                                        admins are $20/year each
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="subtitle1">
                                                Number of Users
                                            </Typography>
                                            <Tooltip 
                                                title="Don't worry about future changes. You can add or replace users at any time. Charges for new users will be pro-rated for the remainder of your subscription."
                                                arrow
                                                placement="right"
                                            >
                                                <InfoIcon 
                                                    sx={{ 
                                                        ml: 1, 
                                                        color: 'primary.main',
                                                        cursor: 'pointer',
                                                        fontSize: 20
                                                    }} 
                                                />
                                            </Tooltip>
                                        </Box>
                                        
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            gap: 4  // Add space between counter and button
                                        }}>
                                            {/* User Count Controls */}
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                maxWidth: 200,
                                            }}>
                                                <IconButton 
                                                    onClick={() => setUserCount(prev => Math.max(2, prev - 1))}
                                                    sx={{
                                                        bgcolor: 'primary.main',
                                                        color: 'white',
                                                        '&:hover': { bgcolor: 'primary.dark' },
                                                        '&.Mui-disabled': { bgcolor: 'grey.300' },
                                                    }}
                                                    disabled={userCount <= 2}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <TextField
                                                    value={userCount}
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        if (!isNaN(value) && value >= 2 && value <= 100) {
                                                            setUserCount(value);
                                                        }
                                                    }}
                                                    inputProps={{ 
                                                        min: 2,
                                                        max: 100,
                                                        style: { textAlign: 'center' }
                                                    }}
                                                    sx={{ mx: 2, width: '80px' }}
                                                />
                                                <IconButton 
                                                    onClick={() => setUserCount(prev => Math.min(100, prev + 1))}
                                                    sx={{
                                                        bgcolor: 'primary.main',
                                                        color: 'white',
                                                        '&:hover': { bgcolor: 'primary.dark' },
                                                        '&.Mui-disabled': { bgcolor: 'grey.300' },
                                                    }}
                                                    disabled={userCount >= 100}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>

                                            {/* CTA Button */}
                                            <Button
                                                variant="contained"
                                                size="large"
                                                // onClick={handleNext}
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    color: 'white',
                                                    px: 4,
                                                    py: 1.5,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                    '&:hover': {
                                                        bgcolor: 'primary.dark',
                                                    },
                                                }}
                                            >
                                                Proceed to Payment
                                            </Button>
                                        </Box>

                                        {/* Dynamic Text */}
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                            sx={{ 
                                                mt: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontStyle: 'italic'
                                            }}
                                        >
                                            <InfoIcon sx={{ fontSize: 16, mr: 1 }} />
                                            Need flexibility? Add or replace users as your team grows—pro-rated pricing ensures you only pay for what you use.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* Right side - Team Benefits */}
                <Grid item xs={12} md={3}>
                    <Card sx={{ p: 3 }}>
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 600 }}
                        >
                            Team Benefits
                        </Typography>
                        <List>
                            {teamFeatures.map((feature, index) => (
                                <ListItem key={index} sx={{ px: 0 }}>
                                    <ListItemIcon>{feature.icon}</ListItemIcon>
                                    <ListItemText primary={feature.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TeamOrgSignup;
