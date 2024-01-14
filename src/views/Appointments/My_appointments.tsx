import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SortOrder } from 'primereact/datatable';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './My_appointments.css';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Appointment {
  id: number;
  date: string;
  doctor: string; 
  nameDoctor: string; 
  lastnameDoctor: string; 
  subject: string;
}

const MyAppointments = () => {
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
  const [sortField, setSortField] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>(1);

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener citas
    axios.get('http://localhost:3000/api/v1/appointments/patients/345')
      .then(response => {
        // Actualizar el estado con las citas recibidas del servidor
        const formattedAppointments = response.data.map((appointment: Appointment) => ({
          ...appointment,
          date: formatDateTime(appointment.date),
          doctor: `${appointment.nameDoctor} ${appointment.lastnameDoctor}`, // doctor contiene la concatenación del nombre y el apellido
        }));
        setAppointmentsData(formattedAppointments);
      })
      .catch(error => {
        console.error('Error al obtener citas:', error);
      });
  }, []); 

  const formatDateTime = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleString(undefined, options).replace(',', ''); // Remueve la coma después del año
  };

  const onSort = (e: any) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder);
  };

  return (
    <div className="appointments-container">
      <h1>MIS CITAS</h1>
      <div className="table-container">
        <DataTable value={appointmentsData} sortField={sortField} sortOrder={sortOrder} onSort={onSort}>
          <Column field="date" header="Fecha y Hora" sortable className="date-column" />
          <Column field="doctor" header="Nombre del Doctor" className="doctor-column" />
          <Column field="subject" header="Asunto de la Cita" className="subject-column" />
        </DataTable>
      </div>
      <div className="row" style={{ display: 'flex', gap: '10px' }}>
        <div className="back-link">
          <Link to="/">
            <Button label="Volver al Inicio" className="p-button-success custom-botton" />
          </Link>
        </div>
        <div className="new-appointment">
          <Link to="/schedulers">
            <Button label="Crear Nueva Cita" className="p-button custom-botton" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
