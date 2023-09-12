import React from 'react';
import './Footer.css';
import { BottomNavigation, BottomNavigationAction, Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FolderIcon from '@mui/icons-material/Folder';

function Footer() {
  return (
    <Box className='footer-container'>
      <Typography variant='h6' align='center'>
        Footer
      </Typography>
      <BottomNavigation>
        <BottomNavigationAction 
          label='Favorites'
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction 
          label='Folder'
          icon={<FolderIcon />}
        />
      </BottomNavigation>
    </Box>
    
  );
}

export default Footer;