import './LoginPage.css';

// LoginPage.js
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Núcleo de PrimeReact
import 'primeicons/primeicons.css'; // Iconos
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e:any) => {
    e.preventDefault();
    // Aquí colocarías la lógica de login, por ejemplo, una llamada API
    try {
      const request = new Request('http://localhost:3000/api/v1/auth/users/login', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBjMDYzNDY3ZmEwMWZkYWZmMDkxZSIsInJvbCI6IlVzdWFyaW8iLCJpYXQiOjE3MDIxNTE3NzN9.xp9pJ6HLc2TV24LsVJQhVqhy_Mjwe6yeukryqlOiLW4',
            'Authorization': 'Bearer 04f9237d-646e-4e0d-90d2-504b1f7dcbc0',
          },
          method: 'POST',
        })
      navigate("/");
      const response = await fetch(request);
      // Handle the response, e.g., redirect to another page on success
      console.log('Login successful', response.status);
      //GUARDAR LOS DATOS EN EL LOCAL STORAGE (ID DE USUARIO Y TOKEN)
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
