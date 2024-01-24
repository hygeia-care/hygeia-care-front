import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SortOrder } from 'primereact/api'; // Importación correcta aquí
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
import { Dialog } from 'primereact/dialog';


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
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

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

  const handleDeleteAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogVisible(true);
  };

  const deleteAppointmentConfirmed = () => {
    if (selectedAppointment) {
      const { id, date, idPatient } = selectedAppointment;
      const formattedDate = parse(date, 'dd/MM/yyyy HH:mm', new Date()).toISOString();
  
      axios.delete(`http://localhost:3335/api/v1/appointments/date/${formattedDate}/patient/${idPatient}`)
        .then(response => {
          if (response.status === 200) {
            // Eliminación exitosa, ahora obtén las citas actualizadas
            axios.get(`http://localhost:3335/api/v1/appointments/patients/${userId}`)
              .then(response => {
                const updatedAppointments = response.data.map((appointment: Appointment) => ({
                  ...appointment,
                  date: formatDateTime(appointment.date),
                  doctor: `${appointment.nameDoctor} ${appointment.lastnameDoctor}`,
                }));
  
                setAppointmentsData(updatedAppointments);
                setNoAppointments(updatedAppointments.length === 0); // Actualiza según si hay citas o no
              })
              .catch(error => {
                console.error('Error al obtener citas después de eliminar:', error);
                setNoAppointments(true); // Asume que no hay citas si hay un error
              });
          } else {
            console.error('Error al eliminar la cita:', response.data);
          }
          setIsDialogVisible(false);
        })
        .catch(error => {
          console.error('Error al eliminar la cita:', error);
          setIsDialogVisible(false);
        });
    }
  };
  
  
  
  
  const dialogFooter = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsDialogVisible(false)} className="p-button-text" />
      <Button label="Confirmar" icon="pi pi-check" onClick={deleteAppointmentConfirmed} className="p-button-text" />
    </div>
  );

  
  const deleteButtonTemplate = (rowData: Appointment) => (
    <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteAppointment(rowData)} />
  );

  return (
    <div className="appointments-container">
      <hr style={{ margin: '20px 0', border: '0', height: '1px', backgroundColor: '#E6F7FF' }} />

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
      <div className="buttons-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <div className="buttons-row">
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

      <Dialog 
        visible={isDialogVisible} 
        onHide={() => setIsDialogVisible(false)} 
        header="Confirmar Eliminación" 
        modal 
        footer={dialogFooter}>
          <p>¿Estás seguro de que deseas eliminar la cita programada para {selectedAppointment?.date}?</p>
      </Dialog>

    </div>
  );
};

export default MyAppointments;
