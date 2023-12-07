// EditUserFormUI.tsx

import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface UserFormUIProps {
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
}

const UserFormUI: React.FC<UserFormUIProps> = ({
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
}) => {
  return (
    <div className="user-container">
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
                            <label htmlFor="nombre">Username</label>
                        </span>
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
                    </div>
                    <Button type="submit" label="Enviar formulario" />
                </form>
            </div>
        </div>
  );
};

export default UserFormUI;
