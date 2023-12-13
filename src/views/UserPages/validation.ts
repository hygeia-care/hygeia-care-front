// validations.ts
export const passwordLengthRequired = 8;

export const isNotEmpty = (value: string): boolean => !!value.trim();

export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password: string) => {
    // La expresión regular requiere al menos una letra, un número y una longitud mínima de 8 caracteres
    const regex = new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).{${passwordLengthRequired},}$`);;
  
    return regex.test(password);
  };
