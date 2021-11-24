import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { RouteGuard } from '@core/Guard';
import { authHttpClient } from '@api';

function AuthGuardRoute(props: RouteProps): JSX.Element {
  const component: RouteProps['component'] = props.component;
  authHttpClient.isAuthUser;
  return <Route {...props} component={RouteGuard(component, authHttpClient.isAuthUser)} />;
}

export default AuthGuardRoute;
