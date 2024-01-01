// GlobalSpinner.js
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner'; // Tu componente Spinner
import { isRequestInProgress } from './requestCounter';

const GlobalSpinner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(isRequestInProgress());
    }, 100); // Intervalo para revisar si hay solicitudes activas

    return () => clearInterval(interval);
  }, []);

  return <>{isLoading && <Spinner />}</>;
};

export default GlobalSpinner;
