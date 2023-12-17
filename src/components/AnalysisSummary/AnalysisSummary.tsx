import { format } from 'date-fns';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';
import { Analysis } from '../../models/devices';
import TableComponent, { ColumnConfig } from '../Table/TableComponent';
import './AnalysisSummary.css';

interface AnalysisSummaryProps {
  analyses: Analysis[];
}

interface AnalysisDetailsModalProps {
  analysis: Analysis | null;
  visible: boolean;
  onHide: () => void;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ analyses }) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (analysis: Analysis) => {
    setSelectedAnalysis(analysis);
    setIsModalVisible(true);
  };

  const measurementDate = (rowData: Analysis) => {
    return format(rowData.measurement.date, 'dd/MM/yyyy HH:mm');
  };

  const detailsButton = (rowData: Analysis) => (
    <button
      className="detailsButton"
      onClick={() => openModal(rowData)}
    >
      Detalles
    </button>
  );

  const columnsConfig: ColumnConfig[] = [
    { field: 'value', header: 'Valor' }, // Asumiendo que 'value' es una clave de Analysis
    { field: 'measurementDate', header: 'Fecha', body: measurementDate }, // Asegúrate de que 'measurementDate' sea una clave válida de Analysis
    { body: detailsButton } // Para columnas sin campo 'field', no hay problema
  ];

  return (
    <div className="analysisContainer">
      <div className="tableContainer">
        <TableComponent value={analyses} columnsConfig={columnsConfig} />
        <AnalysisDetailsModal
          analysis={selectedAnalysis}
          visible={isModalVisible}
          onHide={() => setIsModalVisible(false)}
        />
      </div>
    </div>
  );
};

const AnalysisDetailsModal: React.FC<AnalysisDetailsModalProps> = ({
  analysis,
  visible,
  onHide,
}) => {
  if (!analysis) return null;

  const formattedDate = format(analysis.measurement.date, 'dd/MM/yyyy HH:mm');
  return (
    <Dialog
      header={analysis.measurement.title}
      visible={visible}
      onHide={onHide}
      modal
      className="modalContainer"
      headerClassName="modalHeader"
      contentClassName="modalContent"
    >
      <p>Valor: {analysis.value}</p>
      <p>Fecha de Medición: {formattedDate}</p>
      <p>Comentarios: {analysis.measurement.comment}</p>
      {/* ...otros detalles... */}
    </Dialog>
  );
};

export default AnalysisSummary;
