// Spinner.tsx
import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div data-testid="http-spinner" className="spinner-overlay">
      <div className="spinner-container" />
    </div>
  );
};

export default Spinner;
