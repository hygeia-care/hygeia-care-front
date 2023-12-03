import './App.css';

//tema
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//núcleo
import 'primereact/resources/primereact.min.css';
//iconos
import 'primeicons/primeicons.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import HomePage from './HomePage/HomePage';
import React from 'react';

export default function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}
