// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import EditUserForm from './User/components/form-register-user';

// ...otros imports de página

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* Ruta por defecto en la raíz*/}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<EditUserForm />} />
      {/* ... otras rutas */}
      <Route path='*' element={<NotFoundPage />} /> {/* Ruta por defecto en la raíz*/}
    </Routes>
  );
};

export default AppRouter;
