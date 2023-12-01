// NavigationBar.js
import React from 'react';
import './TopNav.css'; // Asume que tienes estilos específicos para la navegación

const TopNav = () => {
  return (
    <nav className="navigation">
      <a href="/login">Login</a>
      <a href="/create-account">Create account</a>
      <a href="/pricing">Pricing</a>
      <a href="/faq">FAQ</a>
    </nav>
  );
};

export default TopNav;
