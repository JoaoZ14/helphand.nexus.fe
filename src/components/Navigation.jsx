import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa'; // Importando o ícone para o avatar padrão

// styled-components para responsividade e visual moderno
const NavBarContainer = styled(AppBar)`
  && {
    background: #1976d2;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  }
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding: 0.5rem 0.5rem 0.2rem 0.5rem;
  }
`;

const Brand = styled(RouterLink)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 1px;
  margin-right: 2rem;
  transition: color 0.2s;
  &:hover {
    color: #ffb300;
  }
  @media (max-width: 600px) {
    font-size: 1.15rem;
    margin-right: 0.5rem;
  }
`;

const NavLinks = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.2rem;
    margin-top: 0.2rem;
  }
`;

const StyledButton = styled(Button)`
  && {
    color: #fff;
    font-weight: 500;
    border-radius: 20px;
    padding: 6px 18px;
    text-transform: none;
    transition: background 0.18s;
    &:hover {
      background: #1565c0;
    }
    @media (max-width: 600px) {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 2px;
    }
  }
`;

const UserMenuAvatar = styled(IconButton)`
  && {
    margin-left: 0.5rem;
    @media (max-width: 600px) {
      align-self: flex-end;
      margin-left: 0;
    }
  }
`;

const UserName = styled.span`
  color: #fff;
  font-size: 1.05rem;
  font-weight: 500;
  margin-right: 0.5rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

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
    <NavBarContainer position="static">
      <StyledToolbar>
        <Brand to="/">HelpHand</Brand>
        <NavLinks>
          <StyledLink to="/about">
            <StyledButton>Sobre</StyledButton>
          </StyledLink>
          <StyledLink to="/contact">
            <StyledButton>Contato</StyledButton>
          </StyledLink>
          {user ? (
            <>
              <UserName>{user.displayName || user.email}</UserName>
              <UserMenuAvatar
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
                  <FaUserCircle size={32} color="#fff" style={{ background: '#bdbdbd', borderRadius: '50%' }} />
                )}
              </UserMenuAvatar>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    minWidth: 160,
                    boxShadow: '0 2px 12px rgba(25,118,210,0.10)',
                  },
                }}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  Meu Perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </>
          ) : (
            <StyledLink to="/login">
              <StyledButton>Entrar</StyledButton>
            </StyledLink>
          )}
        </NavLinks>
      </StyledToolbar>
    </NavBarContainer>
  );
};

export default Navigation;