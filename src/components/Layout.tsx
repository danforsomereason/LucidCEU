import React, { ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  fullWidth?: boolean;
}

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Add this to prevent page-level scrolling
}));

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showNavbar = true,
  fullWidth = false 
}) => {
  return (
    <StyledBox>
      {showNavbar && (
        <Box 
          component="header" 
          sx={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1 
          }}
        >
          <NavBar />
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: showNavbar ? 'calc(100vh - 84px)' : '100vh',
          marginTop: showNavbar ? '84px' : 0, // Add top margin to account for fixed navbar
          overflow: 'hidden', // Hide overflow at the page level
          ...(fullWidth && {
            width: '100%',
            maxWidth: 'none'
          })
        }}
      >
        {children}
      </Box>
    </StyledBox>
  );
};

export default Layout;