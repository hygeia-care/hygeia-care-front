// HomePage.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ROLE, setNavigationItems } from '../redux/slices/navigationSlice';
import './HomePage.css';
export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Esta función se ejecutará una vez que el componente se monte
    console.log('Componente montado!');
    dispatch(setNavigationItems(ROLE.NOT_LOGGED));
  }, [dispatch]);

  return (
    <div className="main-content">
      {/* ... el resto del contenido principal ... */}
    </div>
  );
}
