// EditUserFormUI.tsx

import "./UserForm.css";
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { passwordLengthRequired } from "../../views/UserPages/validation";
import Modal from "react-modal";
import { AuthState, setRegistrationSuccess } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


interface UserFormUIProps {
  isRegistrationSuccess: boolean;
  name: string;
  surnames: string;
  email: string;
  password: string;
  companiaSanitaria: string;
  tarjetaSanitaria: string;
  handleEditUser: (e: any) => void;
  setName: (value: string) => void;
  setSurnames: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setCompaniaSanitaria: (value: string) => void;
  setTarjetaSanitaria: (value: string) => void;
  errors: {
    name: boolean;
    surnames: boolean;
    email: boolean;
    password: boolean;
    companiaSanitaria: boolean;
    tarjetaSanitaria: boolean;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      name: boolean;
      surnames: boolean;
      email: boolean;
      password: boolean;
      companiaSanitaria: boolean;
      tarjetaSanitaria: boolean;
    }>
  >;
}

const UserFormUI: React.FC<UserFormUIProps> = ({
  isRegistrationSuccess,
  name,
  surnames,
  email,
  password,
  companiaSanitaria,
  tarjetaSanitaria,
  handleEditUser,
  setName,
  setSurnames,
  setEmail,
  setPassword,
  setCompaniaSanitaria,
  setTarjetaSanitaria,
  errors,
}) => {
    Modal.setAppElement("#root");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleRegistrationSuccess = () => {
        console.log("Handling registration success...");
        dispatch(setRegistrationSuccess(false)); // Resetear el estado de éxito
        navigate("/login");
      };

  return (
    <div>
        <div>
        <Modal
          isOpen={isRegistrationSuccess}
          onRequestClose={handleRegistrationSuccess}
          className="modal-dialog modal-dialog-centered"
          contentLabel="Registro Exitoso"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registro Exitoso</h5>
            </div>
            <div className="modal-body">
              <p>Se ha registrado el usuario correctamente.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegistrationSuccess}
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="card">
        <h1>Datos</h1>
        <form onSubmit={handleEditUser}>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="nombre">Nombre</label>
            </span>
            {errors.name && (
              <div className="error-message">El campo es requerido.</div>
            )}
          </div>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="surnames"
                type="text"
                value={surnames}
                onChange={(e) => setSurnames(e.target.value)}
              />
              <label htmlFor="surnames">Apellidos</label>
            </span>
            {errors.surnames && (
              <div className="error-message">El campo es requerido.</div>
            )}
          </div>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </span>
            {errors.email && (
              <div className="error-message">
                El email tiene que ser válido.
              </div>
            )}
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
            {errors.password && (
              <div className="error-message">
                La contraseña debe de tener al menos, una letra, un numero, y un
                mínimo de {passwordLengthRequired} caracteres.
              </div>
            )}
          </div>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="companiaSanitaria"
                type="text"
                value={companiaSanitaria}
                onChange={(e) => setCompaniaSanitaria(e.target.value)}
              />
              <label htmlFor="companiaSanitaria">Compañía Sanitaria</label>
            </span>
            {errors.companiaSanitaria && (
              <div className="error-message">El campo es requerido.</div>
            )}
          </div>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="tarjetaSanitaria"
                type="text"
                value={tarjetaSanitaria}
                onChange={(e) => setTarjetaSanitaria(e.target.value)}
              />
              <label htmlFor="tarjetaSanitaria">Tarjeta Sanitaria</label>
            </span>
            {errors.tarjetaSanitaria && (
              <div className="error-message">El campo es requerido.</div>
            )}
          </div>
          <Button type="submit" label="Registrarse" />
        </form>
      </div>

      
    </div>
  );
};

export default UserFormUI;
