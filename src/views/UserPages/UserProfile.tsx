import React, { useEffect, useState } from 'react';
import AnalysisSummary from '../../components/AnalysisSummary/AnalysisSummary';
import { mockAnalyses } from '../../mocks/analysis';
import { User } from '../../models/user';
import { httpService } from '../../services/httpService';
import { getJwtToken } from '../../services/jwtService';
import './UserProfile.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

async function getUserData(): Promise<User | null> {
  const token = getJwtToken();
  if (token) {
    try {
      const response = await httpService.get<User>(`auth/users/${token.id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  } else {
    return null;
  }
}

const handleEdit = () => {
  // Lógica para manejar la edición del perfil
};

const handleDelete = () => {
  // Lógica para manejar la eliminación del perfil
};

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserData().then(setUser);
  }, []);

  const userCard = user ? (
    <Card title="Perfil de Usuario" className="user-profile-card">
      <div className="user-details">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Apellidos:</strong> {user.apellidos}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Compañía Sanitaria:</strong> {user.companiaSanitaria}</p>
        <p><strong>Tarjeta Sanitaria:</strong> {user.tarjetaSanitaria}</p>
      </div>
      <div className="analysis-summary">
        <AnalysisSummary analyses={mockAnalyses} />
      </div>
      <div className="profile-actions">
        <Button label="Editar" icon="pi pi-pencil" onClick={handleEdit} />
        <Button label="Eliminar" icon="pi pi-trash" onClick={handleDelete} className="p-button-danger" />
      </div>
    </Card>
  ) : (
    <p>Cargando perfil...</p>
  );

  return <div className="user-profile-container">{userCard}</div>;
};

export default UserProfile;
