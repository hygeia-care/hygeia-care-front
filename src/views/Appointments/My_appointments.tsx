// MyAppointments.tsx
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SortOrder } from 'primereact/datatable';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import './My_appointments.css'; 
import { Button } from 'primereact/button';

import { Link } from 'react-router-dom';

const MyAppointments = () => {
  
  const [sortField, setSortField] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>(1);

  const appointmentsData = [
    { id: 1, date: '2024-01-15', doctor: 'Dr. Smith', subject: 'Consulta general' },
    { id: 2, date: '2024-01-20', doctor: 'Dr. Johnson', subject: 'Control de rutina' },
    // ... Otros datos de citas
  ];

  const onSort = (e: any) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder);
  };

  return (
    <div className="appointments-container">
      <h1>MIS CITAS</h1>
      <div className="table-container">
        <DataTable value={appointmentsData} sortField={sortField} sortOrder={sortOrder} onSort={onSort}>
          <Column field="date" header="Fecha" sortable className="date-column" />
          <Column field="doctor" header="Nombre del Doctor" className="doctor-column" />
          <Column field="subject" header="Asunto de la Cita" className="subject-column" />
        </DataTable>
      </div>
      <div className="back-link">
        <Link to="/">
          <Button label="Volver al Inicio" className="p-button-success" />
        </Link>
      </div>
    </div>
  );
};

export default MyAppointments;
