import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png'

const Header = () => (
  <header className="header">
    <div className="logo">
      <img src={logo} alt="Logo" /> 
      </div>
    <h1>VOICER</h1>
    <p>Speak your mind, I'm listening</p>
  </header>
);

export default Header;