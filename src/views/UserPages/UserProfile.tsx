// AnalysisPage.tsx
import React from 'react';
import AnalysisSummary from '../../components/AnalysisSummary/AnalysisSummary';
import { mockAnalyses } from '../../mocks/analysis';

const UserProfile: React.FC = () => {
  return (
    <div>
      <h1>Perfil</h1>
      <AnalysisSummary analyses={mockAnalyses} />
    </div>
  );
};

export default UserProfile;
