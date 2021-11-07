import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components';
import Router from '@core/Router';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
