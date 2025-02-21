import React from "react";
import styled from "styled-components";
import '../utils/header.css'


const Header = () => {
  return (
    <header className="headerContainer">
      <h1 className="logo">Help Hand</h1>
      <nav className="nav">
        <a href="#">Início</a>
        <a href="#">ONGs</a>
        <a href="#">FAQs</a>
        <a href="#">Entrar</a>
      </nav>
    </header>
  );
};

export default Header;