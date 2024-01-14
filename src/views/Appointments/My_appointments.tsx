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
import { parse, format } from 'date-fns';

interface Appointment {
  id: string;
  date: string;
  doctor: string;
  nameDoctor: string;
  lastnameDoctor: string;
  subject: string;
  idPatient: string;
}

const MyAppointments = () => {
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
  const [sortField, setSortField] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>(1);
  const [noAppointments, setNoAppointments] = useState(false);

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener citas
    axios.get('http://localhost:3335/api/v1/appointments/patients/345')
      .then(response => {
        const formattedAppointments = response.data.map((appointment: Appointment) => ({
          ...appointment,
          date: formatDateTime(appointment.date),
          doctor: `${appointment.nameDoctor} ${appointment.lastnameDoctor}`,
        }));
  
        setAppointmentsData(formattedAppointments);
  
        // Verificar si la lista de citas está vacía y actualizar el estado correspondiente
        setNoAppointments(formattedAppointments.length === 0);
      })
      .catch(error => {
        console.error('Error al obtener citas:', error);
  
        // Verificar si el error es debido a que no hay citas
        if (error.response && error.response.status === 404) {
          console.log('No hay citas programadas.');
          setNoAppointments(true);
        } else {
          console.error('Error desconocido al obtener citas:', error);
        }
      });
  }, []);
  

  const formatDateTime = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleString(undefined, options).replace(',', '');
  };

  const onSort = (e: any) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder);
  };

  const handleDeleteAppointment = (id: string, date: string, idPatient: string) => {
    const formattedDate = parse(date, 'dd/MM/yyyy HH:mm', new Date()).toISOString();
  
    axios.delete(`http://localhost:3335/api/v1/appointments/date/${formattedDate}/patient/${idPatient}`)
      .then(response => {
        if (response.status === 200) {
          // Actualizar el estado con las citas recibidas del servidor
          setAppointmentsData(appointmentsData.filter(appointment => appointment.id !== id));
  
          // Verificar si la lista de citas está vacía y actualizar el estado correspondiente
          setNoAppointments(appointmentsData.length === 1);
  
          // Si hay más citas restantes, realizar una nueva solicitud GET para obtener las citas actualizadas
          if (appointmentsData.length > 1) {
            axios.get('http://localhost:3335/api/v1/appointments/patients/345')
              .then(response => {
                const updatedAppointments = response.data.map((appointment: Appointment) => ({
                  ...appointment,
                  date: formatDateTime(appointment.date),
                  doctor: `${appointment.nameDoctor} ${appointment.lastnameDoctor}`,
                }));
  
                // Actualizar el estado con las citas recibidas del servidor
                setAppointmentsData(updatedAppointments);
  
                // Verificar si la lista de citas está vacía y actualizar el estado correspondiente
                setNoAppointments(updatedAppointments.length === 0);
              })
              .catch(error => {
                console.error('Error al obtener citas después de eliminar:', error);
              });
          }
        } else {
          console.error('Error al eliminar la cita:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al eliminar la cita:', error);
      });
  };
  
  

  const deleteButtonTemplate = (rowData: Appointment) => (
    <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteAppointment(rowData.id, rowData.date, rowData.idPatient)} />
  );

  return (
    <div className="appointments-container">
      <h1>MIS CITAS</h1>
      <div className="table-container">
        {noAppointments ? (
          <div>No hay citas programadas.</div>
        ) : (
          <DataTable value={appointmentsData} sortField={sortField} sortOrder={sortOrder} onSort={onSort}>
            <Column field="date" header="Fecha y Hora" sortable className="date-column" />
            <Column field="doctor" header="Nombre del Doctor" className="doctor-column" />
            <Column field="subject" header="Asunto de la Cita" className="subject-column" />
            <Column body={deleteButtonTemplate} />
          </DataTable>
        )}
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
