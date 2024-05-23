import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout();
    navigate('/');
  };

  const goToHomePage = () => {
    navigate('/');
  };

  const handlePasswordPage = () => {
    navigate('/password');
  };

  const handleRecipesPage = () => {
    navigate('/recipes');
  }

  return (
    <AppBar sx={{ backgroundColor: '#222' }}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ cursor: 'pointer' }} onClick={goToHomePage}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tobias Bay
            </Typography>
            <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
              Unlock
            </Typography>
          </Box>
          <Box>
            <Button color="inherit" onClick={handlePasswordPage}>Password</Button>
            <Button color="inherit" onClick={handleRecipesPage}>Recipes</Button>
            <Button color="inherit">Action 3</Button>
            <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
