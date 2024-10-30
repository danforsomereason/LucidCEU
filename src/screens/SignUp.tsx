import React from "react";
import { Button, TextField, Typography, Box, Link } from "@mui/material";
import { createUser } from "../requests/user";

const SignUp: React.FC = () => {
    return (
        <Box>
            <Button
                onClick={() => {
                    createUser();
                }}
            >
                Register
            </Button>
        </Box>
    );
};

export default SignUp;
