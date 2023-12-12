// EditUserForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserFormUI from '../../components/User/user-form';
import { isNotEmpty, isValidEmail, isValidPassword } from './validation';
import Modal from 'react-modal'; // Importa la librería

const RegisterUserForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [surnames, setSurnames] = useState('');
  const [email, setEmail] = useState('');
  const [companiaSanitaria, setCompaniaSanitaria] = useState('');
  const [tarjetaSanitaria, setTarjetaSanitaria] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    surnames: false,
    email: false,
    password: false,
    companiaSanitaria: false,
    tarjetaSanitaria: false,
  });
  const [isRegistrationSuccess, setRegistrationSuccess] = useState(false);

  const handleEditUser = async (e: any) => {
    e.preventDefault();

    // Validaciones
    const isNameValid: boolean = isNotEmpty(name);
    const isTarjetaSanitariaValid: boolean = isNotEmpty(tarjetaSanitaria);
    const isCompaniaSanitariaValid: boolean = isNotEmpty(companiaSanitaria);
    const isSurnamesValid: boolean = isNotEmpty(surnames);
    const isEmailValid: boolean = isValidEmail(email);
    const isPasswordValid: boolean = isValidPassword(password);

    // Actualizar el estado de los errores
    const errors = {
      name: !isNameValid,
      surnames: !isSurnamesValid,
      email: !isEmailValid,
      password: !isPasswordValid,
      companiaSanitaria: !isCompaniaSanitariaValid,
      tarjetaSanitaria: !isTarjetaSanitariaValid,
    };
    setErrors(errors);

    if (isNameValid && isSurnamesValid && isEmailValid && isPasswordValid && isCompaniaSanitariaValid && isTarjetaSanitariaValid) {

      const registerUser = {
        "nombre": name,
        "email": email,
        "password": password,
        "apellidos": surnames,
        "companiaSanitaria": companiaSanitaria,
        "tarjetaSanitaria": tarjetaSanitaria,
        "rol": "Usuario",
      };

      try {
        const request = new Request('http://localhost:3000/api/v1/auth/users', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzBjMDYzNDY3ZmEwMWZkYWZmMDkxZSIsInJvbCI6IlVzdWFyaW8iLCJpYXQiOjE3MDIxNTE3NzN9.xp9pJ6HLc2TV24LsVJQhVqhy_Mjwe6yeukryqlOiLW4',
            'Authorization': 'Bearer 04f9237d-646e-4e0d-90d2-504b1f7dcbc0',
          },
          method: 'POST',
          body: JSON.stringify(registerUser)
        })
        const response = await fetch(request);
        console.log(response.status);
        if (response.status === 201) {
          console.log("Registro exitoso");
          setRegistrationSuccess(true);
          navigate("/login");
        } else if (response.status === 409) {
          setErrors({ ...errors, email: true });
          console.log("Se ha producido un conflicto a la hora de enviar el formulario");
        }
        console.log(registerUser);
      } catch (error) {
        console.log("No es posible registrar el usuario" + error)
        console.log(errors)
      }
    } else {
      console.log("Los campos no se han rellenado correctamente")
    }

  };

  const closeSuccessMessage = () => {
    setRegistrationSuccess(false);
  };

  return (
    <div>
      <Modal
        isOpen={isRegistrationSuccess}
        onRequestClose={closeSuccessMessage}
        contentLabel="Registro Exitoso"
      >
        <div>
          <p>¡Registro exitoso! Se ha registrado el usuario correctamente.</p>
          <button onClick={closeSuccessMessage}>Cerrar</button>
        </div>
      </Modal>
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
        errors={errors}
        setErrors={setErrors} />
    </div>
  );
};

export default RegisterUserForm;
