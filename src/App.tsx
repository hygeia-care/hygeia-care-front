import './App.css';

//tema
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//núcleo
import 'primereact/resources/primereact.min.css';
//iconos
import 'primeicons/primeicons.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import React from 'react';
import AppRouter from './AppRouter';
import TopNav from './components/TopNav/TopNav';
export default function App() {
  return (
    <div className="App">
      <TopNav />
      <div className="content">
        <AppRouter />
      </div>
      <footer className="footer">
        <a href="/terms">Terms of service</a>
      </footer>
    </div>
  );
}
