import React from 'react';
import { Header, Loader } from '@components';
import Router from '@core/Router';
import { useAppSelector } from '@hooks';
import { selectLoadingState } from '@store/util/Slice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ONE_SECOND } from '@constants/consts';

const DefaultLayout = (): JSX.Element => {
  const isLoading = useAppSelector(selectLoadingState);
  return (
    <>
      <Header />
      <Router />
      {isLoading && <Loader />}
      <ToastContainer
        style={{ top: '90px' }}
        position="top-right"
        autoClose={3 * ONE_SECOND}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default DefaultLayout;
