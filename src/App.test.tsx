import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import TopNav from './components/TopNav/TopNav';
import store from './redux/store';
describe('Pruebas para App', () => {
  // Crea un store de prueba
  beforeEach(() => {});

  afterEach(() => {
    // Limpia el DOM después de cada prueba
    cleanup();
  });
  // Envuelve tu componente con el Provider en tus pruebas
  test('TopNav se renderiza con Redux', () => {
    render(
      <Provider store={store}>
        <Router>
          <TopNav />
        </Router>
      </Provider>
    );
  });
});
