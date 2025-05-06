import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Grid,
    Checkbox,
    FormControlLabel,
    Button,
    Card,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Link,
} from "@mui/material";
import { format, addYears } from "date-fns";
import {
    createUser,
    checkOrganizationVerification,
    updateUser,
    checkUserExists,
} from "../../requests/user";
import { globalContext } from "../../context/globalContext";
import { Console, log } from "console";

interface UserFormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    license_type: string;
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

const IndividualCheckout: React.FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<UserFormData>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        license_type: "",
    });

    const [formErrors, setFormErrors] = useState<{ message: string } | null>(
        null
    );
    const [verificationMessage, setVerificationMessage] = useState<
        string | null
    >(null);

    const [existingUserMessage, setExistingUserMessage] = useState<
        string | null
    >(null);

    const globalValue = useContext(globalContext);
    console.log("Global Value: ", globalValue);

    const handleTextFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateConfirmPassword = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value !== formData.password) {
            setFormErrors({
                message: "Please ensure your fields are entered correctly",
            });
        } else {
            setFormErrors(null);
        }
    };

    const checkExistingUser = async (e: React.FocusEvent<HTMLInputElement>) => {
        const email = e.target.value;
        if (!email) return;

        try {
            const result = await checkUserExists(email);
            if (result.exists) {
                setExistingUserMessage(
                    "This email is already registered. Would you like to sign in?"
                );
            } else {
                setExistingUserMessage(null);
            }
        } catch (error) {
            console.error("Error checking user:", error);
        }
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formErrors) return;

        try {
            const body = JSON.stringify(formData);
            const headers = {
                "Content-Type": "application/json",
            };
            const init = {
                method: "POST",
                body,
                headers,
            };
            const response = await fetch(
                "http://localhost:5001/api/v1/users/signup",
                init
            );
            const output = await response.json();
            console.log(output);
            localStorage.setItem("token", output.token);
            globalValue?.setCurrentUser(output.user);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error during signup:", error);
            setVerificationMessage(
                "An error occurred during signup. Please try again."
            );
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Left side - Order Summary */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3, bgcolor: "background.paper" }}>
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
                                    Individual Plan
                                </Typography>
                                <Typography>$50.00</Typography>
                            </Box>
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
                                    $50.00
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>

                {/* Right side - Checkout Form */}

                <Grid item xs={12} md={8}>
                    <Box sx={{ width: "100%", mb: 4 }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    {activeStep === 0 && (
                        <Box component="form" noValidate onSubmit={handleNext}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="First Name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleTextFieldChange}
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Last Name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleTextFieldChange}
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
                                        value={formData.email}
                                        onChange={handleTextFieldChange}
                                        onBlur={checkExistingUser}
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
                                        value={formData.password}
                                        onChange={handleTextFieldChange}
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
                                        value={formData.confirm_password}
                                        onChange={handleTextFieldChange}
                                        onBlur={validateConfirmPassword}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>License Type</InputLabel>
                                        <Select
                                            name="license_type"
                                            value={formData.license_type}
                                            label="License Type"
                                            onChange={handleSelectChange}
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
                                {verificationMessage && (
                                    <Grid item xs={12}>
                                        <Typography color="error">
                                            {verificationMessage}
                                        </Typography>
                                    </Grid>
                                )}
                                {existingUserMessage && (
                                    <Typography color="primary" sx={{ mt: 1 }}>
                                        {existingUserMessage}
                                        <Link href="/login" sx={{ ml: 1 }}>
                                            Sign in
                                        </Link>
                                    </Typography>
                                )}
                            </Grid>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    mt: 3,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        bgcolor: "var(--secondary-color)",
                                        "&:hover": {
                                            bgcolor: "var(--primary-color)",
                                        },
                                    }}
                                >
                                    Next
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default IndividualCheckout;
