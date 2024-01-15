import React, { useState, useEffect, ChangeEvent } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Schedulers.css';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getJwtToken } from '../../services/jwtService';
import httpService from '../../services/httpService';
import { User } from '../../models/user';

interface Scheduler {
    _id: string;
    name: string;
    lastname: string;
    date: string;
    email: string;
    doctor: string;
}

const Schedulers: React.FC = () => {
    const [missingSchedulers, setMissingSchedulers] = useState<Scheduler[]>([]);
    const [selectedScheduler, setSelectedScheduler] = useState<Scheduler | null>(null);
    const [asunto, setAsunto] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const schedulersResponse = await axios.get('http://localhost:3336/api/v1/schedulers');
                const formattedSchedulers = schedulersResponse.data.map((scheduler: Scheduler) => ({
                    ...scheduler,
                    date: formatDateTime(scheduler.date),
                    doctor: `${scheduler.name} ${scheduler.lastname}`,
                }));

                const appointmentsResponse = await axios.get('http://localhost:3335/api/v1/appointments');
                const formattedAppointments = appointmentsResponse.data.map((appointment: Scheduler) => ({
                    ...appointment,
                    date: formatDateTime(appointment.date),
                    doctor: `${appointment.name} ${appointment.lastname}`,
                }));

                const missingSchedulersData: Scheduler[] = formattedSchedulers.filter((scheduler: Scheduler) => {
                    return !formattedAppointments.some((appointment: Scheduler) => {
                        return (
                            appointment.doctor === scheduler.doctor &&
                            appointment.date === scheduler.date
                        );
                    });
                });

                setMissingSchedulers(missingSchedulersData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    const formatDateTime = (dateTimeString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
        return new Date(dateTimeString).toLocaleString(undefined, options).replace(',', '');
    };

    const handleSchedulerSelection = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedEmail = e.target.value;
        const selected = missingSchedulers.find((scheduler) => scheduler.email === selectedEmail);

        if (selected) {
            console.log('Scheduler seleccionado:', selected);
            setSelectedScheduler(selected);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAsunto(e.target.value);
    };

    const handleCreateAppointment = async () => {
        // Lógica para crear una cita
        if (!selectedScheduler) {
            alert('Debe elegir una cita disponible.');
            return;
        } else if (asunto === null || asunto.trim() === '') {
            // Muestra la alerta con el mensaje proporcionado
            alert('El asunto no puede estar vacío.');
            return;
        }

        try {
            // Obtener datos adicionales del scheduler seleccionado
            const token = getJwtToken();
            const datosUser = await httpService().get<User>(`auth/users/${token?.id}`);

            console.log('Id usuario logueado: ', datosUser.data._id);

            // Agregar los detalles del scheduler a los datos de la cita
            const postData = {
                nameDoctor: selectedScheduler.name,
                lastnameDoctor: selectedScheduler.lastname,
                idPatient: datosUser.data._id,
                namePatient: datosUser.data.nombre,
                lastnamePatient: datosUser.data.apellidos,
                date: selectedScheduler.date,
                subject: asunto,
            };

            // Realizar la solicitud POST a la API de appointments con los datos combinados
            const createAppointmentResponse = await axios.post('http://localhost:3335/api/v1/appointments', postData);

            // Comprobar la respuesta y realizar acciones adicionales si es necesario
            if (createAppointmentResponse.status === 201) {
                // La cita se creó con éxito
                console.log('Cita creada con éxito');
                // Redirigir a la página /appointments
                window.location.href = '/appointments';
            } else {
                console.error('Error al crear la cita:', createAppointmentResponse.data);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    return (
        <div className="scheduler-container">
            <h2>Citas Disponibles</h2>
            <select className="custom-select" onChange={(e) => handleSchedulerSelection(e)}>
                <option value="">Selecciona Fecha - Doctor</option>
                {missingSchedulers.map((missingScheduler) => (
                    <option key={missingScheduler._id} value={missingScheduler.email}>
                        {`${missingScheduler.date} - ${missingScheduler.doctor}`}
                    </option>
                ))}
            </select>
            <input type="text" id="asunto" name="asunto" placeholder="Asunto" className="custom-input" onChange={handleInputChange} />

            <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <div className="back-link">
                    <Link to="/appointments">
                        <Button label="Volver" className="p-button-success custom-botton" />
                    </Link>
                </div>
                <div className="new-appointment">
                    <Button className="p-button custom-botton" label="Crear Cita" onClick={handleCreateAppointment} />
                </div>
            </div>
        </div>
    );
};

export default Schedulers;
