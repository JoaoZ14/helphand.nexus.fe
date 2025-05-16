import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa'; // Importando o ícone para o avatar padrão

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  marginRight: theme.spacing(2),
}));

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      handleClose();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink to="/">HelpHand</StyledLink>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledLink to="/about">
            <Button color="inherit">Sobre</Button>
          </StyledLink>
          <StyledLink to="/contact">
            <Button color="inherit">Contato</Button>
          </StyledLink>

          {user ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {user.photoURL ? (
                  <Avatar
                    src={user.photoURL}
                    alt={user.displayName || 'Usuário'}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <FaUserCircle size={32} color="#ccc" />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  Meu Perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </>
          ) : (
            <StyledLink to="/login">
              <Button color="inherit">Entrar</Button>
            </StyledLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;