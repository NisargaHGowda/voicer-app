import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png'

const Header = () => (
  <header className="header">
    
    <div className="center-content">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h1>VOICER</h1>
      <p>Speak your mind, I'm listening</p>
    </div>

    <div className="left-content">
      <h2>Welcome to Voicer</h2>
      <p>
        Explore the topic displayed on your screen and feel free to dive into the
        conversation with us. Let's make it engaging and insightful.
      </p>
    </div>

    <div className="topic-container">
        <h2>Topic:</h2>
        <p>How can technology and Artificial Intelligence transform and improve the education system</p>
      </div>

  </header>
);

export default Header;