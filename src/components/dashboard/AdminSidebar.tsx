import { Box, Theme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext } from "react";
import { globalContext } from "../../context/globalContext";

const drawerWidth = 280;

interface SidebarProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

export const AdminSidebar = ({
    mobileOpen,
    handleDrawerToggle,
}: SidebarProps) => {
    const context = useContext(globalContext);
    const isAdmin = context?.currentUser?.isAdmin ?? false;

    const userMenuItems = [
        { text: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
        {
            text: "My Courses",
            icon: <SchoolIcon />,
            path: "/dashboard/courses",
        },
        {
            text: "Progress",
            icon: <BarChartIcon />,
            path: "/dashboard/progress",
        },
        { text: "Profile", icon: <PersonIcon />, path: "/dashboard/profile" },
    ];

    const adminMenuItems = [
        ...userMenuItems,
        { text: "Users", icon: <PeopleIcon />, path: "/dashboard/users" },
        {
            text: "Settings",
            icon: <SettingsIcon />,
            path: "/dashboard/settings",
        },
    ];

    const menuItems = isAdmin ? adminMenuItems : userMenuItems;

    const drawer = (
        <Box sx={{ mt: 6 }}>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        mt: "64px",
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        mt: "64px",
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};
