// AppRoutes.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/User/ProtectedRoute';
import { ROLE } from './models/user';
import { setNavigationItems } from './redux/slices/navigationSlice';
import { getJwtToken } from './services/jwtService';
import MyAppointments from './views/Appointments/My_appointments';
import HomePage from './views/HomePage/HomePage';
import LoginPage from './views/LoginPage/LoginPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import UserProfile from './views/UserPages/UserProfile';
import UserForm from './views/UserPages/form-register-user';

// ...otros imports de página

const AppRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    // Esta función se ejecutará una vez que el componente se monte
    console.log('Componente montado!');
    const token = getJwtToken();
    if (token) {
      dispatch(setNavigationItems(token.rol));
    } else {
      dispatch(setNavigationItems(ROLE.NOT_LOGGED));
    }
  }, [dispatch, location]); // Observa los cambios en la ubicación

  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* Ruta por defecto en la raíz*/}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<UserForm />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/appointments" element={<MyAppointments />} />
      {/* ... otras rutas */}
      <Route path="*" element={<NotFoundPage />} />{' '}
      {/* Ruta por defecto en la raíz*/}
    </Routes>
  );
};

export default AppRouter;
