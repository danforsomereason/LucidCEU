import React, { useState } from "react";
import { Box, Typography, Slider, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TeamOrgSignup: React.FC = () => {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState<number>(2);
    const isTeam = userCount <= 10;
    const pricePerUser = isTeam ? 50 : 45;

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                {isTeam ? "Team" : "Organization"} Plan Setup
            </Typography>
            
            <Box sx={{ mt: 4 }}>
                <Typography gutterBottom>Number of Users</Typography>
                <Slider
                    value={userCount}
                    onChange={(_, newValue) => setUserCount(newValue as number)}
                    min={2}
                    max={100}
                    valueLabelDisplay="on"
                    marks={[
                        { value: 2, label: '2' },
                        { value: 10, label: '10' },
                        { value: 100, label: '100' },
                    ]}
                />
                
                <Typography variant="h5" sx={{ mt: 4 }}>
                    Total: ${userCount * pricePerUser}/year
                </Typography>

                {/* Upgrade button */}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Need more users or custom features?
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/signup/enterprise")}
                    >
                        Upgrade to Enterprise
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default TeamOrgSignup; 