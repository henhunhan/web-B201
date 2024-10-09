// src/components/Footer.js
import React from 'react';
import './Logo.css';
import b201 from './assets/b201.png';
import ce from './assets/ce.png';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="logos">
        <img src={b201} alt="Lab B201" />
        <img src={ce} alt="Computer Engineering" />
      </div>

    </footer>
  );
};

export default Footer;

