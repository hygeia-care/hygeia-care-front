// EditUserForm.tsx

import React, { useState } from "react";
import UserFormUI from "../../components/User/user-form";
import { ROLE } from "../../models/user";
import httpService from "../../services/httpService";
import { isNotEmpty, isValidEmail, isValidPassword } from "./validation";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { setRegistrationSuccess } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";

const RegisterUserForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [surnames, setSurnames] = useState("");
  const [email, setEmail] = useState("");
  const [companiaSanitaria, setCompaniaSanitaria] = useState("");
  const [tarjetaSanitaria, setTarjetaSanitaria] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    surnames: false,
    email: false,
    password: false,
    companiaSanitaria: false,
    tarjetaSanitaria: false,
  });
   
  const dispatch = useDispatch();
  const isRegistrationSuccess = useSelector((state: RootState) => state.auth.isRegistrationSuccess);
  console.log(isRegistrationSuccess);

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

    if (
      isNameValid &&
      isSurnamesValid &&
      isEmailValid &&
      isPasswordValid &&
      isCompaniaSanitariaValid &&
      isTarjetaSanitariaValid
    ) {
      const registerUser = {
        nombre: name,
        email: email,
        password: password,
        apellidos: surnames,
        companiaSanitaria: companiaSanitaria,
        tarjetaSanitaria: tarjetaSanitaria,
        rol: ROLE.USER,
      };

      try {
        const response = await httpService().post<any>(
          "auth/users",
          JSON.stringify(registerUser)
        );
        console.log(response);

        if (response.status === 201) {
          console.log("Registro exitoso");
          dispatch(setRegistrationSuccess(true));
          console.log(isRegistrationSuccess);
          console.log("Usuario registrado");
        } else if (response.status === 409) {
          setErrors({ ...errors, email: true });
          console.log(
            "Se ha producido un conflicto a la hora de enviar el formulario"
          );
        }
        console.log(registerUser);
      } catch (error) {
        console.log("No es posible registrar el usuario: " + error);
        console.log();
      }
    } else {
      console.log("Los campos no se han rellenado correctamente");
    }
  };

  return (
    <div>
      <UserFormUI
        isRegistrationSuccess={isRegistrationSuccess}
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
        setErrors={setErrors}
      />
    </div>
  );
};

export default RegisterUserForm;

