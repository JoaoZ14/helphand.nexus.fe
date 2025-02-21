import React from "react";
import styled from "styled-components";
import '../utils/styles/header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="headerContainer">
      <img src="logo.png" className="logo" alt="Logo" onClick={() => navigate('/')} />
      <nav className="nav">
        <a onClick={() => navigate('/')}>Início</a>
        <a onClick={() => navigate('/ongs')}>ONGs</a>
        <a onClick={() => navigate('/faqs')}>FAQs</a>
        <button className="loginButton" onClick={() => navigate('/login')}>Entrar</button>
      </nav>
    </header>
  );
};

export default Header;