import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import { BrowserRouter } from 'react-router-dom';
import { useSilentRefresh, useAppSelector } from '@hooks';
import { DefaultLayout } from '@components';
import { selectTheme } from '@store/util/Slice';

function App(): JSX.Element {
  const mode = useAppSelector(selectTheme);
  useSilentRefresh();
  return (
    <>
      <ThemeProvider theme={theme[mode]}>
        <GlobalStyle />
        <BrowserRouter>
          <DefaultLayout />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
