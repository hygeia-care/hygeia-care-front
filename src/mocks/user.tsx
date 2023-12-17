import { User } from '../models/user';

export const mockUsers: User[] = [
  {
    nombre: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    apellidos: 'Doe',
    companiaSanitaria: 'Compañía A',
    tarjetaSanitaria: '1234567890',
  },
  {
    nombre: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
    apellidos: 'Smith',
    companiaSanitaria: 'Compañía B',
    tarjetaSanitaria: '0987654321',
  },
];
