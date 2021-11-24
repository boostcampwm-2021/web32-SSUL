import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { RouteGuard, authenficateReturnType } from '@core/Guard';
import { authHttpClient } from '@api';

function GroupBelongGuardRoute(props: RouteProps): JSX.Element {
  const component: RouteProps['component'] = props.component;
  return (
    <Route
      {...props}
      component={RouteGuard(component, authHttpClient.isGroupBelong as authenficateReturnType)}
    />
  );
}

export default GroupBelongGuardRoute;
