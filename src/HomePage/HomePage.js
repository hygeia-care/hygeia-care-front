// HomePage.js
import React from 'react';
import TopNav from '../TopNav/TopNav';
import './HomePage.css';
import hygeiaLogo from '../assets/hygeia-logo.png'; // Asegúrate de que la ruta es correcta

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <img
          src={hygeiaLogo}
          alt="Hygeia Logo"
          className="logo"
        />
        <TopNav /> {/* Utiliza el componente NavigationBar aquí */}
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
