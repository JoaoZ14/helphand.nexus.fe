import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import '../utils/styles/header.css';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { FaBars } from 'react-icons/fa';

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

  // Detecta se é mobile
  const isMobile = window.innerWidth <= 900;

  useEffect(() => {
    if (!showMobileNav) return;
    function handleClickOutside(event) {
      // Fecha se clicar fora do menu OU no botão do menu
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
    <header className="headerContainer">
      <button className="logoBtn" onClick={() => navigate('/')} tabIndex={0} aria-label="Ir para a página inicial">
        <img src="../../../logo.png" className="logo" alt="Logo" />
      </button>
      {isMobile && (
        <button ref={menuBtnRef} className="mobileMenuButton" onClick={() => setShowMobileNav(!showMobileNav)} aria-label="Abrir menu">
          <FaBars size={28} />
        </button>
      )}
      <nav
        ref={isMobile ? mobileNavRef : undefined}
        className={`nav${isMobile ? ' mobileNav' : ''}${showMobileNav ? ' show' : ''}`}
        style={isMobile && !showMobileNav ? { display: 'none' } : {}}>
        <button className="navBtn" onClick={() => {navigate('/'); setShowMobileNav(false);}} tabIndex={0}>Início</button>
        <button className="navBtn" onClick={() => {navigate('/ongs'); setShowMobileNav(false);}} tabIndex={0}>ONGs</button>
        <button className="navBtn" onClick={() => {navigate('/faqs'); setShowMobileNav(false);}} tabIndex={0}>FAQs</button>
        {user ? (
          <div className="userMenu">
            <img
              src={user.photoURL || 'https://via.placeholder.com/32'}
              alt={user.displayName || 'Usuário'}
              className="userAvatar"
              onClick={() => setShowMenu(!showMenu)}
              tabIndex={0}
            />
            {showMenu && (
              <div className="menuDropdown">
                <button className="menuItem" onClick={() => { navigate('/profile'); setShowMenu(false); setShowMobileNav(false); }} tabIndex={0}>
                  Meu Perfil
                </button>
                <button className="menuItem" onClick={handleLogout} tabIndex={0}>
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="loginButton" onClick={() => {navigate('/login'); setShowMobileNav(false);}} tabIndex={0}>Entrar</button>
        )}
      </nav>
    </header>
  );
};

export default Header;