// AnalysisPage.tsx
import React from 'react';
import AnalysisSummary from '../../components/AnalysisSummary/AnalysisSummary';
import { Analysis, Measurement, MeasurementType } from '../../models/devices';
import { User } from '../../models/user';

const UserProfile: React.FC = () => {
  // Datos de prueba - reemplaza esto con datos reales según tu aplicación
  const userSample: User = {
    nombre: 'Ana',
    email: 'ana@example.com',
    password: 'contraseñaSegura123',
    apellidos: 'García Pérez',
    compañiaSanitaria: 'SaludPlus',
    tarjetaSanitaria: 'SP1234567890',
  };

  const measurementSample: Measurement = {
    _id: '1',
    title: 'Medición de Prueba',
    date: new Date(),
    comment: 'Comentario de prueba',
    type: MeasurementType.SCAN,
    user: userSample,
  };
  const measurementSample2: Measurement = {
    _id: '2',
    title: 'Medición de Prueba2',
    date: new Date('10/10/2010'),
    comment: 'Comentario de prueba2',
    type: MeasurementType.SCAN,
    user: userSample,
  };

  const analysisSamples: Analysis[] = [
    {
      _id: '101',
      value: 'Valor de Prueba',
      measurement: measurementSample,
    },
    {
      _id: '102',
      value: 'Valor de Prueba2',
      measurement: measurementSample2,
    },
  ];

  return (
    <div>
      <h1>Perfil</h1>
      <AnalysisSummary analyses={analysisSamples} />
    </div>
  );
};

export default UserProfile;
