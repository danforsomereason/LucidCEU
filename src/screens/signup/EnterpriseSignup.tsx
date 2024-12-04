import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Container,
} from "@mui/material";

const EnterpriseSignup: React.FC = () => {
    const [userCount, setUserCount] = useState<string>("");
    const [features, setFeatures] = useState({
        additionalAdmins: false,
        instructorRoles: false,
        customReporting: false,
    });

    const getPrice = (users: number) => {
        if (users >= 1000) return 32;
        if (users >= 500) return 37;
        return 40;
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Enterprise Solution
            </Typography>

            <Box component="form" sx={{ mt: 4 }}>
                <TextField
                    fullWidth
                    label="Number of Users"
                    type="number"
                    value={userCount}
                    onChange={(e) => setUserCount(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Typography variant="h6" sx={{ mb: 2 }}>
                    Additional Features
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={features.additionalAdmins}
                            onChange={(e) =>
                                setFeatures((prev) => ({
                                    ...prev,
                                    additionalAdmins: e.target.checked,
                                }))
                            }
                        />
                    }
                    label="Additional Admin Seats"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={features.instructorRoles}
                            onChange={(e) =>
                                setFeatures((prev) => ({
                                    ...prev,
                                    instructorRoles: e.target.checked,
                                }))
                            }
                        />
                    }
                    label="Instructor Roles"
                />
            </Box>
        </Container>
    );
};

export default EnterpriseSignup;
