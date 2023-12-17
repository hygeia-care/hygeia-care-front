import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import React from 'react';
import { mockAnalyses } from '../../mocks/analysis';
import AnalysisSummary from './AnalysisSummary';

describe('Pruebas para AnalysisSummary', () => {
  beforeEach(() => {});

  afterEach(() => {
    // Limpia el DOM después de cada prueba
    cleanup();
  });

  test('se renderiza sin errores', () => {
    render(<AnalysisSummary analyses={[]} />);
  });

  test('muestra datos de análisis en la tabla', () => {
    render(<AnalysisSummary analyses={mockAnalyses} />);
    expect(screen.getByTestId('cell-value-0').textContent).toContain('10');
    expect(screen.getByTestId('cell-value-1').textContent).toContain('20');
  });

  test('abrir y cerrar el modal de detalles', async () => {
    render(<AnalysisSummary analyses={mockAnalyses} />);

    const buttonElement = within(screen.getByTestId('cell-action-0')).getByRole(
      'button'
    );
    fireEvent.click(buttonElement);
    expect(
      screen.getByText('Medición 1', {
        selector: '.p-dialog-title',
      })
    ).toBeVisible();
    const closeButton = screen.getByText('', {
      selector: '.p-dialog-header-close',
    });
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(
        screen.queryByText('Medición 1', { selector: '.p-dialog-title' })
      ).not.toBeInTheDocument();
    });
  });

  test('formato de fecha correcto en la tabla', () => {
    render(<AnalysisSummary analyses={mockAnalyses} />);
    const dateElement = screen.getByTestId('cell-measurementDate-0');
    const dateFormatRegex = /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/; // Expresión regular para dd/MM/yyyy HH:mm

    expect(dateElement.textContent).toMatch(dateFormatRegex);
  });
});
