export interface User {
  nombre: string;
  email: string;
  password: string;
  apellidos: string;
  companiaSanitaria: string;
  tarjetaSanitaria: string;
}

export enum ROLE {
  ADMIN = 'Administrador',
  USER = 'Usuario',
  NOT_LOGGED = '',
}

export interface JwtUserData {
  iat: number;
  id: string;
  rol: ROLE;
}
