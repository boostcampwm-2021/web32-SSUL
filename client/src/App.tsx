import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components';
import Router from '@core/Router';
import { useSlientRefresh } from '@hooks';

function App(): JSX.Element {
  useSlientRefresh();
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
