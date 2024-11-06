import React from 'react';
import { 
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';

// Constants
const DRAWER_WIDTH = 288;

// Types
interface Section {
  id: number;
  title: string;
  completed: boolean;
}

interface CourseProgress {
  completed: number;
  total: number;
}

// Styled components
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: DRAWER_WIDTH,
  backgroundColor: theme.palette.grey[100],
  minHeight: '100vh',
  overflow: 'auto'
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDrawer = styled(Drawer)(() => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
  },
}));

const LessonPage: React.FC = () => {
  const theme = useTheme();

  // Sample data - replace with your actual data
  const sections: Section[] = [
    { id: 1, title: 'Intro to Course', completed: true },
    { id: 2, title: 'Background and history', completed: false },
    { id: 3, title: 'Understanding complex concepts in counseling', completed: false },
    { id: 4, title: 'Quiz', completed: false }
  ];

  const progress: CourseProgress = {
    completed: 1,
    total: sections.length
  };

  const progressPercentage = (progress.completed / progress.total) * 100;

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer
        variant="permanent"
        anchor="left"
      >
        <DrawerHeader>
          <Typography variant="h6">
            Name of the Course will be located here
          </Typography>
          <Typography variant="caption" color="text.secondary">
            by Name of Instructor
          </Typography>
        </DrawerHeader>

        <List>
          {sections.map((section) => (
            <ListItem
              key={section.id}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>
                {section.completed ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="disabled" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={section.title}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: section.completed ? 'text.primary' : 'text.secondary',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ position: 'absolute', bottom: theme.spacing(2), left: theme.spacing(2) }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HelpIcon />}
          >
            HELP
          </Button>
        </Box>
      </StyledDrawer>

      <Main>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Progress - {progressPercentage}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Paper>

        <Paper sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
          <Typography variant="h4" gutterBottom>
            HEADING - NAME OF THE COURSE SECTION
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Subheading - Intro to Course
          </Typography>
          <Typography variant="body1" paragraph>
            Here is a paragraph of text that serves as the main course content. 
            Here, users will read relevant information to learn the course material. 
            Users will learn about the topic presented. Each course will be divided 
            into sections which are like chapters...
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button variant="contained" color="primary" size="large">
              NEXT
            </Button>
          </Box>
        </Paper>
      </Main>
    </Box>
  );
};

export default LessonPage;