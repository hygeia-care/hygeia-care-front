// NavigationBar.js
import { Menubar } from 'primereact/menubar';
import React from 'react';
import { useSelector } from 'react-redux';
import image from '../assets/hygeia-logo.png'; // Asegúrate de que la ruta sea correcta
import { RootState } from '../redux/store';
import './TopNav.css';
import { useNavigate } from 'react-router-dom';

export default function TopNav() {
  const items = useSelector((state: RootState) => state.navigation.items);
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }
  return (
    <div className="topnav-container">
      <header className="header">
        <img src={image} alt="Hygeia Logo" className="logo" onClick={goHome} />
        <div className="navigation">
          <Menubar model={items} />
        </div>
      </header>
    </div>
  );
}
