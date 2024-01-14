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
    id: string;
    name: string;
    lastname: string;
    date: string; // Considerando que date es una cadena que incluye día y hora
    email: string;
    doctor: string;
  }

  const Schedulers = () => {
    const [schedulersData, setSchedulersData] = useState<Scheduler[]>([]);
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
          setSchedulersData(formattedSchedulers);
  
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
            // Aquí puedes realizar acciones con el 'selectedScheduler'
            console.log('Scheduler seleccionado:', selected);
            setSelectedScheduler(selected)
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setAsunto(e.target.value);
    };

    const handleCreateAppointment = async () => {
        // Lógica para crear una cita
        if (!selectedScheduler) {
          alert('Debe elegir una cita disponible.');
        }else if (asunto === null || asunto.trim() === '') {
          // Muestra la alerta con el mensaje proporcionado
          alert('El asunto no puede estar vacío.');
          return;
        }
        const token = getJwtToken();

        const datosUser = await httpService().get<User>(`auth/users/${token?.id}`);
        console.log(datosUser.data.nombre + " " + datosUser.data.apellidos + " id:" + datosUser.data._id);
        console.log('Crear cita');
        console.log(selectedScheduler)
        console.log(asunto)
    };
      
    return (
        <div className="scheduler-container">
          <h2>Citas Disponibles</h2>
          <select className="custom-select" onChange={(e) => handleSchedulerSelection(e)}>
              <option value="">Selecciona Fecha - Doctor</option>
              {missingSchedulers.map((missingScheduler) => (
              <option key={missingScheduler.id} value={missingScheduler.email}>
                  {`${missingScheduler.date} - ${missingScheduler.doctor}`}
              </option>
              ))}
          </select>
          <input type="text" id="asunto" name="asunto" placeholder="Asunto" className="custom-input" onChange={handleInputChange}/>

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