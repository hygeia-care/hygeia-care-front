import './LoginPage.css';

// LoginPage.js
import 'primeicons/primeicons.css'; // Iconos
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css'; // Núcleo de PrimeReact
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { httpService } from '../../services/httpService';
import { setJwtToken } from '../../services/jwtService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    wrongCredentials: false,
  });
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const userLogin = {
      email: username,
      password: password,
    };
    try {
      const response = await httpService.post<{ token: string }>(
        'auth/users/login',
        JSON.stringify(userLogin)
      );

      if (response.status === 401) {
        console.log('credenciales erroneas');
        setErrors({ ...errors, wrongCredentials: true });
        console.log(response);
      } else {
        const data = response.data;
        const token = data.token;
        console.log('Login successful', response.status);
        //GUARDAR LOS DATOS EN EL LOCAL STORAGE (ID DE USUARIO Y TOKEN)
        setJwtToken(token);
        setTimeout(() => {
          navigate('/');
        }, 1);
      }
    } catch (error: any) {
      // Handle errors, e.g., display an error message
      console.error('Login failed', error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Username</label>
            </span>
          </div>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </span>
            {errors.wrongCredentials && (
              <div className="error-message">Credenciales erróneas.</div>
            )}
          </div>
          <Button type="submit" label="Login" />
        </form>
        <div className="register-link">
          <span>¿No tienes cuenta aún? </span>
          <Link to="/register">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
