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
import { getJwtToken } from '../../services/jwtService';
import httpService from '../../services/httpService';
import { User } from '../../models/user';

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
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
  const [sortField, setSortField] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>(1);
  const [noAppointments, setNoAppointments] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getJwtToken();
        if (token) {
          const datosUser = await httpService().get<User>(`auth/users/${token.id}`);
          console.log(datosUser.data.nombre + " " + datosUser.data.apellidos + " id:" + datosUser.data._id);

          setUserId(datosUser.data._id || ''); // Usa un valor predeterminado si _id es undefined
          setUserName(`${datosUser.data.nombre} ${datosUser.data.apellidos}`);
        }
      } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
        // Handle errors if needed
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3335/api/v1/appointments/patients/${userId}`);
          const formattedAppointments = response.data.map((appointment: Appointment) => ({
            ...appointment,
            date: formatDateTime(appointment.date),
            doctor: `${appointment.nameDoctor} ${appointment.lastnameDoctor}`,
          }));
          setAppointmentsData(formattedAppointments);
          setNoAppointments(formattedAppointments.length === 0);
        } catch (error: any) { 
          console.error('Error al obtener citas:', error);
        
          if (error.response && error.response.status === 404) {
            console.log('No hay citas programadas.');
            setNoAppointments(true);
          } else {
            console.error('Error desconocido al obtener citas:', error);
          }
        }
        
      };

      fetchData();
    }
  }, [userId]);

  const formatDateTime = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleString(undefined, options).replace(',', '');
  };

  const onSort = (e: any) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder);
  };


  const handleDeleteAppointment = (id: string, date: string, idPatient: string) => {
    // Mostrar el cuadro de diálogo de confirmación
    const isConfirmed = window.confirm(`¿Estás seguro de eliminar la cita programada para ${formatDateTime(date)}?`);
  
    // Si el usuario confirma la eliminación, proceder con la solicitud DELETE
    if (isConfirmed) {
      const formattedDate = parse(date, 'dd/MM/yyyy HH:mm', new Date()).toISOString();
  
      axios
        .delete(`http://localhost:3335/api/v1/appointments/date/${formattedDate}/patient/${idPatient}`)
        .then(response => {
          if (response.status === 200) {
            setAppointmentsData(appointmentsData.filter(appointment => appointment.id !== id));
            setNoAppointments(appointmentsData.length === 1);
  
            if (appointmentsData.length > 1) {
              axios
                .get(`http://localhost:3335/api/v1/appointments/patients/${userId}`)
                .then(response => {
                  const updatedAppointments = response.data.map((appointment: Appointment) => ({
                    ...appointment,
                    date: formatDateTime(appointment.date),
                    doctor: `${appointment.nameDoctor} ${appointment.lastnameDoctor}`,
                  }));
  
                  setAppointmentsData(updatedAppointments);
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
    }
  };
  
  
  const deleteButtonTemplate = (rowData: Appointment) => (
    <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteAppointment(rowData.id, rowData.date, rowData.idPatient)} />
  );

  return (
    <div className="appointments-container">
      <h1>MIS CITAS</h1>
      <div className="user-info">
        <p style={{ backgroundColor: '#E6F7FF', borderRadius: '8px', padding: '10px' }}>{userName}</p>
      </div>
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
            <Button label="Pedir Cita" className="p-button custom-botton" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
