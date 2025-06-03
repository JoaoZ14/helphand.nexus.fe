import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { FaBars } from 'react-icons/fa';

const HeaderContainer = styled.header`
  height: 80px;
  background:rgba(209, 209, 209, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  @media (max-width: 700px) {
    flex-direction: column;
    height: 50px;
    padding: 0.5rem 0.7rem;
    align-items: stretch;
  }
`;

const LogoBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  img {
    height: 200px;
    margin-top: 20px;
    transition: filter 0.2s;
    filter: drop-shadow(0 2px 4px rgba(25, 118, 210, 0.10));
    @media (max-width: 700px) {
          margin-top: -20px;

      height: 100px;
    }
  }
  &:focus {
    outline: 2px solid #ffb300;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  transition: all 0.2s;
  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70vw;
    max-width: 320px;
    background: #fff;
    box-shadow: -2px 0 16px rgba(25, 118, 210, 0.10);
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5rem 1.5rem 1.5rem 1.5rem;
    transform: translateX(100%);
    transition: transform 0.25s;
    z-index: 200;
    gap: 0.7rem;
    &.show {
      transform: translateX(0);
    }
  }
`;

const NavBtn = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-size: 1.08rem;
  font-weight: 600;
  padding: 7px 18px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  &:hover, &:focus {
    background: #e3f0ff;
    color: #0d47a1;
    outline: none;
  }
  @media (max-width: 900px) {
    width: 100%;
    text-align: left;
    color: #1976d2;
    background: none;
    border-radius: 8px;
    font-size: 1.08rem;
    padding: 10px 0 10px 8px;
  }
`;

const LoginButton = styled(NavBtn)`
  background: #1976d2;
  color: #fff;
  border-radius: 20px;
  font-weight: 700;
  &:hover, &:focus {
    background: #1565c0;
    color: #fff;
    outline: none;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: rgba(25, 118, 210, 0.8);
  font-size: 2rem;
  margin-left: 1rem;
  cursor: pointer;
  display: none;
  @media (max-width: 900px) {
    display: block;
    position: absolute;
    right: 1.2rem;
    top: 1.1rem;
    z-index: 300;
  }
  &:focus {
    outline: 2px solid #ffb300;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #1976d2;
  background: #e3f0ff;
  transition: box-shadow 0.18s;
  &:hover, &:focus {
    box-shadow: 0 0 0 3px #e3f0ff;
    outline: none;
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.13);
  border-radius: 10px;
  min-width: 150px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-size: 1rem;
  padding: 10px 18px;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s;
  &:hover, &:focus {
    background: #e3f0ff;
    outline: none;
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: ${({ show }) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(25, 118, 210, 0.13);
    z-index: 150;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const mobileNavRef = useRef();
  const menuBtnRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      setShowMenu(false);
      setShowMobileNav(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Responsivo: detecta mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!showMobileNav) return;
    function handleClickOutside(event) {
      if (
        (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) ||
        menuBtnRef.current?.contains(event.target)
      ) {
        setShowMobileNav(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileNav]);

  return (
    <HeaderContainer>
      <LogoBtn onClick={() => navigate('/')} tabIndex={0} aria-label="Ir para a página inicial">
        <img src="/logo.png" alt="Logo" />
      </LogoBtn>
      {isMobile && (
        <MobileMenuButton ref={menuBtnRef} onClick={() => setShowMobileNav(!showMobileNav)} aria-label="Abrir menu">
          <FaBars size={28} />
        </MobileMenuButton>
      )}
      <Overlay show={showMobileNav} onClick={() => setShowMobileNav(false)} />
      <Nav
        ref={isMobile ? mobileNavRef : undefined}
        className={isMobile && showMobileNav ? 'show' : ''}
        style={isMobile && !showMobileNav ? { display: 'none' } : {}}
      >
        <NavBtn onClick={() => {navigate('/'); setShowMobileNav(false);}}>Início</NavBtn>
        <NavBtn onClick={() => {navigate('/ongs'); setShowMobileNav(false);}}>ONGs</NavBtn>
        <NavBtn onClick={() => {navigate('/faqs'); setShowMobileNav(false);}}>FAQs</NavBtn>
        {user ? (
          <UserMenu>
            {/* <UserAvatar
              src={user.photoURL || 'https://via.placeholder.com/32'}
              alt={user.displayName || 'Usuário'}
              onClick={() => setShowMenu(!showMenu)}
              tabIndex={0}
              style={{ boxShadow: showMenu ? '0 0 0 3px #e3f0ff' : undefined, borderColor: showMenu ? '#1565c0' : undefined, transition: 'box-shadow 0.18s, border-color 0.18s' }}
            /> */}
            {!isMobile && (
              <>
                <UserAvatar
                  src={user.photoURL || 'https://via.placeholder.com/32'}
                  alt={user.displayName || 'Usuário'}
                  onClick={() => setShowMenu(!showMenu)}
                  tabIndex={0}
                  style={{ boxShadow: showMenu ? '0 0 0 3px #e3f0ff' : undefined, borderColor: showMenu ? '#1565c0' : undefined, transition: 'box-shadow 0.18s, border-color 0.18s' }}
                />
                {showMenu && (
                  <MenuDropdown style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 120,
                    justifyContent: 'flex-start',
                    padding: 0,
                    boxShadow: '0 8px 32px rgba(25,118,210,0.18)',
                    border: '1px solid #e3f0ff',
                    background: 'rgba(255,255,255,0.98)',
                    animation: 'fadeIn 0.18s',
                    minWidth: 200
                  }}>
                    <div style={{padding: '14px 18px 8px 18px', borderBottom: '1px solid #f0f0f0', marginBottom: 2}}>
                      <div style={{fontWeight: 600, color: '#1976d2', fontSize: '1.08rem', marginBottom: 2, wordBreak: 'break-all'}}>{user.displayName || user.email}</div>
                      <div style={{fontSize: '0.93rem', color: '#888', wordBreak: 'break-all'}}>{user.email}</div>
                    </div>
                    <MenuItem style={{marginTop: 2, fontWeight: 500}} onClick={() => { navigate('/profile'); setShowMenu(false); setShowMobileNav(false); }}>
                      Meu Perfil
                    </MenuItem>
                    <div style={{flex: 1, minHeight: 12}} />
                    <MenuItem style={{ borderTop: '1px solid #eee', marginTop: 8, color: '#d32f2f', fontWeight: 700, alignSelf: 'stretch', background: 'none', textAlign: 'center', borderRadius: 0, fontSize: '1.05rem', letterSpacing: 0.5 }} onClick={handleLogout}>
                      Sair
                    </MenuItem>
                  </MenuDropdown>
                )}
              </>
            )}
            {/* No mobile, mostra 'Meu Perfil' ao lado da foto */}
            {isMobile && (
              <MenuItem style={{marginLeft: 8, marginRight: 0, padding: '8px 10px'}} onClick={() => { navigate('/profile'); setShowMenu(false); setShowMobileNav(false); }}>
                Meu Perfil
              </MenuItem>
            )}
            {/* No mobile, botão sair sempre visível */}
            {isMobile && (
              <MenuItem style={{marginLeft: 8, background: '#f8f8f8', color: '#d32f2f', fontWeight: 600}} onClick={handleLogout}>
                Sair
              </MenuItem>
            )}
          </UserMenu>
        ) : (
          <LoginButton onClick={() => {navigate('/login'); setShowMobileNav(false);}}>Entrar</LoginButton>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;