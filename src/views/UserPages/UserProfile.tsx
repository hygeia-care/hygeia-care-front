import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnalysisSummary from '../../components/AnalysisSummary/AnalysisSummary';
import TableComponent from '../../components/Table/TableComponent';
import { Analysis, Measurement } from '../../models/devices';
import { ROLE, User } from '../../models/user';
import httpService from '../../services/httpService';
import { getJwtToken, isAdmin } from '../../services/jwtService';
import './UserProfile.css';

async function getUserData(userId?: string): Promise<User | null> {
  const token = getJwtToken();
  if (token) {
    try {
      const response = await httpService(3333).get<User>(
        `auth/users/${userId ?? token.id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  } else {
    return null;
  }
}

async function getAnalysisData(): Promise<Analysis[] | null> {
  const token = getJwtToken();
  if (token) {
    try {
      const response = await httpService(3334).get<Analysis[]>(
        `analysis?userId=${token.id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  } else {
    return null;
  }
}

async function getMeasurementData(
  analysis: Analysis
): Promise<Measurement | null> {
  try {
    const response = await httpService(3334).get<Measurement>(
      `measurement/${analysis.measurement}`
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
}

async function getAllUsers(): Promise<User[] | null> {
  if (isAdmin()) {
    try {
      const response = await httpService(3333).get<User[]>(`auth/users`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      return null;
    }
  } else {
    return null;
  }
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [editFormData, setEditFormData] = useState<User>({
    nombre: '',
    apellidos: '',
    email: '',
    companiaSanitaria: '',
    tarjetaSanitaria: '',
    password: '',
  });
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [analyses, setAnalyses] = useState<Analysis[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData(userId);
      setUser(userData);
      if (userData) {
        setEditFormData({
          nombre: userData.nombre || '',
          apellidos: userData.apellidos || '',
          email: userData.email || '',
          companiaSanitaria: userData.companiaSanitaria || '',
          tarjetaSanitaria: userData.tarjetaSanitaria || '',
          password: '',
          rol: (userData.rol as ROLE) || undefined,
        });
      }
      const userAnalysis = await getAnalysisData();
      if (userAnalysis) {
        Promise.all(
          userAnalysis.map((analysis) => {
            return getMeasurementData(analysis).then((measurement) => {
              if (!measurement) {
                return;
              }
              measurement.date = new Date(
                measurement?.date as unknown as string
              );
              return { ...analysis, measurement }; // Combinar análisis con su medición
            });
          })
        ).then((combinedData) => {
          setAnalyses(combinedData as Analysis[]);
        });
      }
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };
    fetchData();
  }, [userId]);

  const handleEdit = async () => {
    if (!isAdmin()) {
      return;
    }
    try {
      await httpService().put<User>(`/auth/users/${user?._id}`, editFormData);
      setUser({ ...user, ...editFormData });
      setIsEditDialogVisible(false);
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  const handleDelete = async () => {
    if (!isAdmin()) {
      return;
    }
    try {
      await httpService().delete<User>(`/auth/users/${user?._id}`);
      setIsEditDialogVisible(false);
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar los datos del usuario:', error);
    }
  };

  const showEditDialog = () => setIsEditDialogVisible(true);
  const hideEditDialog = () => setIsEditDialogVisible(false);
  const showDeleteDialog = () => setIsDeleteDialogVisible(true);
  const hideDeleteDialog = () => setIsDeleteDialogVisible(false);

  const handleEditFormChange = (e: any) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const editDialogFooter = (
    <div className="edit-dialog-footer">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={hideEditDialog}
        className="p-button-text"
      />
      <Button label="Guardar" icon="pi pi-check" onClick={handleEdit} />
    </div>
  );

  const deleteDialogFooter = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={hideDeleteDialog}
        className="p-button-text"
      />
      <Button
        label="Eliminar"
        icon="pi pi-trash"
        onClick={handleDelete}
        className="p-button-danger"
      />
    </div>
  );

  const editForm = (
    <form className="edit-form">
      <label>
        Nombre:{' '}
        <input
          type="text"
          name="nombre"
          value={editFormData.nombre}
          onChange={handleEditFormChange}
        />
      </label>
      <label>
        Apellidos:{' '}
        <input
          type="text"
          name="apellidos"
          value={editFormData.apellidos}
          onChange={handleEditFormChange}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        />
      </label>
      <label>
        Compañía Sanitaria:{' '}
        <input
          type="text"
          name="companiaSanitaria"
          value={editFormData.companiaSanitaria}
          onChange={handleEditFormChange}
        />
      </label>
      <label>
        Tarjeta Sanitaria:{' '}
        <input
          type="text"
          name="tarjetaSanitaria"
          value={editFormData.tarjetaSanitaria}
          onChange={handleEditFormChange}
        />
      </label>
      <label>
        Nueva contraseña:{' '}
        <input
          type="password"
          name="password"
          value={editFormData.password}
          onChange={handleEditFormChange}
        />
      </label>
    </form>
  );

  const usersColumnsConfig = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'apellidos', header: 'Apellidos' },
    { field: 'email', header: 'Email' },
    { field: 'companiaSanitaria', header: 'Compañía Sanitaria' },
    { field: 'tarjetaSanitaria', header: 'Tarjeta Sanitaria' },
  ];

  const onRowSelect = (e: any) => {
    // Navegar al perfil del usuario seleccionado
    navigate(`/profile/${e.data._id}`);
  };

  const userCard = user ? (
    <Card title="Perfil de Usuario" className="user-profile-card">
      <div className="user-details">
        <p>
          <strong>Nombre:</strong> {user.nombre}
        </p>
        <p>
          <strong>Apellidos:</strong> {user.apellidos}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Compañía Sanitaria:</strong> {user.companiaSanitaria}
        </p>
        <p>
          <strong>Tarjeta Sanitaria:</strong> {user.tarjetaSanitaria}
        </p>
      </div>
      <div className="analysis-summary">
        <AnalysisSummary analyses={analyses ?? []} />
      </div>

      {isAdmin() && users && (
        <TableComponent
          value={users}
          columnsConfig={usersColumnsConfig}
          selectionMode="single"
          onRowSelect={onRowSelect}
        />
      )}

      {isAdmin() && (
        <div className="profile-actions">
          <Button label="Editar" icon="pi pi-pencil" onClick={showEditDialog} />
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            onClick={showDeleteDialog}
            className="p-button-danger"
          />
        </div>
      )}
    </Card>
  ) : (
    <p>Cargando perfil...</p>
  );

  return (
    <div className="user-profile-container">
      {userCard}
      <Dialog
        header="Editar Perfil"
        visible={isEditDialogVisible}
        style={{ width: '50vw' }}
        footer={editDialogFooter}
        onHide={hideEditDialog}
        className="edit-dialog"
      >
        {editForm}
      </Dialog>

      <Dialog
        header="Confirmar Eliminación"
        visible={isDeleteDialogVisible}
        style={{ width: '50vw' }}
        footer={deleteDialogFooter}
        onHide={hideDeleteDialog}
      >
        <p>¿Estás seguro de que quieres eliminar tu perfil?</p>
      </Dialog>
    </div>
  );
};

export default UserProfile;
