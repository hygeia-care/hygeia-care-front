// jwtService.ts
import { jwtDecode } from 'jwt-decode';
import { JwtUserData, ROLE } from '../models/user';

export function decodeToken(token: string): JwtUserData | null {
  try {
    const decoded = jwtDecode<JwtUserData>(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export function clearJwtToken(): void {
  localStorage.removeItem('authToken');
}

export function setJwtToken(token: string): void {
  localStorage.setItem('authToken', token);
}

export function getRawJwtToken(): string | null {
  return localStorage.getItem('authToken');
}

export function getJwtToken(): JwtUserData | null {
  const token: string | null = getRawJwtToken();
  if (token) {
    return decodeToken(token);
  } else {
    return null;
  }
}

export function isAdmin(): boolean {
  const token: JwtUserData | null = getJwtToken();
  if (token) {
    return token.rol === ROLE.ADMIN;
  } else {
    return false;
  }
}
