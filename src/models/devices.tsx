import { User } from './user';

export enum MeasurementType {
  SCAN = 'scan',
  BLOOD_PREASSURE = 'bloodPressure',
}

// Interface para la entidad Measurement
export interface Measurement {
  _id: string; // Identificador único de la medición
  title: string; // Título o nombre de la medición
  date: Date; // Fecha en la que se realizó la medición
  comment: string; // Comentarios adicionales sobre la medición
  type: MeasurementType; // Tipo de la medición
  user: User; // Usuario asociado a la medición
}

// Interface para la entidad Analysis
export interface Analysis {
  _id: string; // Identificador único del análisis
  value: number | string | any; // Valor resultante del análisis (any para base64)
  measurement: Measurement; // Medición sobre la cual se ha realizado el análisis
}
