import { format } from 'date-fns';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';
import { Analysis } from '../../models/devices';
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
    if (rowData.measurement.date instanceof Date) {
      return format(rowData.measurement.date, 'dd/MM/yyyy HH:mm');
    } else {
      return rowData.measurement.date;
    }
  };

  const detailsButton = (analysis: Analysis) => (
    <button className="detailsButton" onClick={() => openModal(analysis)}>
      Detalles
    </button>
  );

  return (
    <div className="analysisContainer">
      <div className="tableContainer">
        <DataTable
          className="dataTable"
          value={analyses}
          sortField="measurement.date"
          sortOrder={-1}
        >
          <Column field="value" header="Valor"></Column>
          <Column
            field="measurement.date"
            header="Fecha"
            body={measurementDate}
            sortable
          ></Column>
          <Column body={detailsButton}></Column>
        </DataTable>

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
  const formattedDate = format(
    new Date(analysis.measurement.date),
    'dd/MM/yyyy HH:mm'
  );
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
