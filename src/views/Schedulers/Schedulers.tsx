import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Schedulers.css';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const schedulersResponse = await axios.get('http://localhost:3002/api/v1/schedulers');
          const formattedSchedulers = schedulersResponse.data.map((scheduler: Scheduler) => ({
            ...scheduler,
            date: formatDateTime(scheduler.date),
            doctor: `${scheduler.name} ${scheduler.lastname}`,
          }));
          setSchedulersData(formattedSchedulers);
  
          const appointmentsResponse = await axios.get('http://localhost:3001/api/v1/appointments');
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
        } else {
            // Manejar el caso cuando no se selecciona un Scheduler válido
            console.warn('Scheduler no encontrado para el email:', selectedEmail);
        }
    };

    const handleCreateAppointment = () => {
        // Lógica para crear una cita
        console.log('Crear cita');
        console.log(selectedScheduler)
    };
      
    return (
        <div className="scheduler-container">
            <div className="centered-container">
                <h2>Citas Disponibles</h2>
                <select className="custom-select" onChange={(e) => handleSchedulerSelection(e)}>
                    <option value="">Seleccionar Scheduler</option>
                    {missingSchedulers.map((missingScheduler) => (
                    <option key={missingScheduler.id} value={missingScheduler.email}>
                        {`${missingScheduler.date} - ${missingScheduler.doctor}`}
                    </option>
                    ))}
                </select>
            </div>
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