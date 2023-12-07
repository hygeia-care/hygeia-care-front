import './LoginPage.css';

// LoginPage.js
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Núcleo de PrimeReact
import 'primeicons/primeicons.css'; // Iconos
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditUserForm = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [surnames, setSurnames] = useState('');
    const [email, setEmail] = useState('');
    const [companiaSanitaria, setCompaniaSanitaria] = useState('');
    const [tarjetaSanitaria, setTarjetaSanitaria] = useState('');

    const handleEditUser = async (e: any) => {
        e.preventDefault();
        const updateUserData = {
            "nombre": name,
            "email": email,
            "password": password,
            "apellidos": surnames,
            "compañiaSanitaria": companiaSanitaria,
            "tarjetaSanitaria": tarjetaSanitaria,
            "rol": "Usuario",
        };

        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/users', updateUserData);
            console.log(response.status);
            if(response.status===201) {
                console.log("Registro exitoso");
                navigate("/login");
            }
            console.log(updateUserData);
        } catch (error) {
            console.error("No es posible registrar el usuario")
        }

    };

    return (
        <div className="edit-user-container">
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

export default EditUserForm;
