import { Container, Stack, Typography, TextField } from "@mui/material";


export default function CourseCreator() {
    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h3" gutterBottom>
                Course Details
            </Typography>
            <Stack spacing={2}>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Course Title"
                    fullWidth
                />
                <TextField
                    name="course_description"
                    variant="outlined"
                    label="Course Description"
                    fullWidth
                    multiline
                    rows={4}
                />
                <h3>Learning Objectives:</h3>
                <Stack direction="row" spacing={2}>
                    {/* LearningObjectives > AddObjective */}
                </Stack>
            </Stack>
        </Container>
    );
}
