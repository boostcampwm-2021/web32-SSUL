import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components';
import Router from '@core/Router';
import { useSilentRefresh } from '@hooks';

function App(): JSX.Element {
  useSilentRefresh();
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
