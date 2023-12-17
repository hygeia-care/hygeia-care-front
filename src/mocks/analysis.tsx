import { Analysis, MeasurementType } from '../models/devices';
import { mockUsers } from './user';

export const mockAnalyses: Analysis[] = [
  {
    _id: '1',
    value: 10,
    measurement: {
      _id: 'm1',
      title: 'Medición 1',
      date: new Date('2023-01-01T10:00:00'),
      comment: 'Comentario sobre la medición 1',
      type: MeasurementType.SCAN,
      user: mockUsers[0],
    },
  },
  {
    _id: '2',
    value: 20,
    measurement: {
      _id: 'm2',
      title: 'Medición 2',
      date: new Date('2023-01-02T11:00:00'),
      comment: 'Comentario sobre la medición 2',
      type: MeasurementType.SCAN,
      user: mockUsers[1],
    },
  },
];
