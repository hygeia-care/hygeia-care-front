import './LoginPage.css';

// LoginPage.js
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Núcleo de PrimeReact
import 'primeicons/primeicons.css'; // Iconos
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e:any) => {
    e.preventDefault();
    // Aquí colocarías la lógica de login, por ejemplo, una llamada API
    try {
      // Assuming you are making a POST request to this API endpoint
      const response = await axios.post('http://localhost:3000/api/v1/auth/users', {
        username,
        password,
      });
    
      // Handle the response, e.g., redirect to another page on success
      console.log('Login successful', response.data);
    } catch (error: any) {
      // Handle errors, e.g., display an error message
      console.error('Login failed', error.message);
    }
    console.log(username, password);
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
