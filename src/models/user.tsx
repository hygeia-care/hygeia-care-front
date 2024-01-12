export interface User {
  _id?: string;
  rol?:ROLE
  nombre: string;
  email: string;
  password: string;
  apellidos: string;
  companiaSanitaria: string;
  tarjetaSanitaria: string;
}

export enum ROLE {
  ADMIN = 'Admin',
  USER = 'Usuario',
  NOT_LOGGED = '',
}

export interface JwtUserData {
  iat: number;
  id: string;
  rol: ROLE;
}
