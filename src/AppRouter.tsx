// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import LoginPage from './views/LoginPage/LoginPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import UserForm from './views/UserPages/form-register-user';

// ...otros imports de página

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* Ruta por defecto en la raíz*/}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<UserForm />} />
      {/* ... otras rutas */}
      <Route path='*' element={<NotFoundPage />} /> {/* Ruta por defecto en la raíz*/}
    </Routes>
  );
};

export default AppRouter;
