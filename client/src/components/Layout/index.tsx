import React from 'react';
import { Header, Loader } from '@components';
import Router from '@core/Router';
import { useAppSelector } from '@hooks';
import { selectLoadingState } from '@store/slices/utilSlice';

const DefaultLayout = (): JSX.Element => {
  const isLoading = useAppSelector(selectLoadingState);
  return (
    <>
      <Header />
      <Router />
      {isLoading && <Loader />}
    </>
  );
};

export default DefaultLayout;
