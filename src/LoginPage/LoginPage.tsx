import './LoginPage.css';

// LoginPage.js
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Núcleo de PrimeReact
import 'primeicons/primeicons.css'; // Iconos

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e:any) => {
    e.preventDefault();
    // Aquí colocarías la lógica de login, por ejemplo, una llamada API
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
      </div>
    </div>
  );
};

export default LoginPage;
