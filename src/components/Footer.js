// src/components/Footer.js
import React from 'react';
import './Footer.css';
import b201 from './assets/b201.png';
import ce from './assets/ce.png';
import its from './assets/its.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logos">
        <img src={b201} alt="Lab B201" />
        <img src={ce} alt="Computer Engineering" />
        <img src={its} alt="ITS" />
      </div>
      <p>Contact : b201crew@gmail.com</p>
      <p>Computer Engineering ITS : Docker Images Hub</p>
    </footer>
  );
};

export default Footer;

