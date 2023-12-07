// NotFoundPage.js
import { Card } from 'primereact/card';
import React from 'react';
import './NotFoundPage.css'; // Asegúrate de que la ruta sea correcta

const NotFoundPage = () => {

  return (
    <div className="not-found-container">
      <Card title="404 - Page Not Found" style={{ width: '25em' }}>
        <p className="m-0" style={{ lineHeight: '1.5' }}>
          We're sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
      </Card>
    </div>
  );
};

export default NotFoundPage;
