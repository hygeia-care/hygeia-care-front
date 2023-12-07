// EditUserForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserFormUI from '../../components/User/user-form';

const RegisterUserForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [surnames, setSurnames] = useState('');
  const [email, setEmail] = useState('');
  const [companiaSanitaria, setCompaniaSanitaria] = useState('');
  const [tarjetaSanitaria, setTarjetaSanitaria] = useState('');

  const handleEditUser = async (e: any) => {
    e.preventDefault();
    const registerUser = {
      "nombre": name,
      "email": email,
      "password": password,
      "apellidos": surnames,
      "compañiaSanitaria": companiaSanitaria,
      "tarjetaSanitaria": tarjetaSanitaria,
      "rol": "Usuario",
    };

    try {
      const request = new Request('http://localhost:3000/api/v1/auth/users', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(registerUser)
      })
      const response = await fetch(request);
      console.log(response.status);
      if (response.status === 201) {
        console.log("Registro exitoso");
        navigate("/login");
      }
      console.log(registerUser);
    } catch (error) {
      console.error("No es posible registrar el usuario")
    }

  };

  return (
    <UserFormUI
      name={name}
      surnames={surnames}
      email={email}
      password={password}
      companiaSanitaria={companiaSanitaria}
      tarjetaSanitaria={tarjetaSanitaria}
      handleEditUser={handleEditUser}
      setName={setName}
      setSurnames={setSurnames}
      setEmail={setEmail}
      setPassword={setPassword}
      setCompaniaSanitaria={setCompaniaSanitaria}
      setTarjetaSanitaria={setTarjetaSanitaria}
    />
  );
};

export default RegisterUserForm;
