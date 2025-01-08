import React from "react";
import { styled, Theme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;
const navbarHeight = 84;

interface MainProps {
  open?: boolean;
  theme?: Theme;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>(
  ({ theme, open }) => ({
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface DrawerProps {
  open?: boolean;
  theme?: Theme;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<DrawerProps>(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: theme.palette.background.default,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  })
);

const menuItems = [
  { text: 'Home', icon: <HomeIcon /> },
  { text: 'Profile', icon: <PersonIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer variant="permanent" open={true}>
      <DrawerHeader>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            alt="User Name"
            src="/path-to-avatar.jpg"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="subtitle1">
            User Name
          </Typography>
        </Box>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Stack spacing={2} sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Additional content can go here
        </Typography>
      </Stack>
    </Drawer>
  );
}