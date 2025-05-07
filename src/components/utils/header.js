import React, { useState, useEffect } from "react";
import styled from "styled-components";
import '../utils/styles/header.css';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="headerContainer">
      <img src="logo.png" className="logo" alt="Logo" onClick={() => navigate('/')} />
      <nav className="nav">
        <a onClick={() => navigate('/')}>Início</a>
        <a onClick={() => navigate('/ongs')}>ONGs</a>
        <a onClick={() => navigate('/faqs')}>FAQs</a>
        {user ? (
          <div className="userMenu">
            <img
              src={user.photoURL || 'https://via.placeholder.com/32'}
              alt={user.displayName || 'Usuário'}
              className="userAvatar"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="menuDropdown">
                <div className="menuItem" onClick={() => { navigate('/profile'); setShowMenu(false); }}>
                  Meu Perfil
                </div>
                <div className="menuItem" onClick={handleLogout}>
                  Sair
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="loginButton" onClick={() => navigate('/login')}>Entrar</button>
        )}
      </nav>
    </header>
  );
};

export default Header;