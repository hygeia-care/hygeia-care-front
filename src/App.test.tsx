import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import TopNav from './components/TopNav/TopNav';
import store from './redux/store';
describe('Pruebas para App', () => {
  beforeEach(() => {});

  afterEach(() => {
    // Limpia el DOM después de cada prueba
    cleanup();
  });

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
