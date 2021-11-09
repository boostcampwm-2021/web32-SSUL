import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSilentRefresh } from '@hooks';
import { DefaultLayout } from '@components';

function App(): JSX.Element {
  useSilentRefresh();
  return (
    <BrowserRouter>
      <DefaultLayout />
    </BrowserRouter>
  );
}

export default App;
