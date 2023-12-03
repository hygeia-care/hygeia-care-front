// HomePage.js
import React from 'react';
import TopNav from '../TopNav/TopNav';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <img
          src="../assets/hygeia-logo.png"
          alt="Hygeia Logo"
          className="logo"
        />
        <TopNav />
      </header>
      <main className="main-content">
        {/* ... el resto del contenido principal ... */}
      </main>
      <footer className="footer">
        <a href="/terms">Terms of service</a>
      </footer>
    </div>
  );
};

export default HomePage;
