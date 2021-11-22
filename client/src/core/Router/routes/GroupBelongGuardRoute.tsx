import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import RouteGuard from '@core/Guard/RouteGaurd';
import { RouteGuardScopes } from '@core/Guard/RouteGaurd';

function GroupBelongGuardRoute(props: RouteProps): JSX.Element {
  const component: RouteProps['component'] = props.component;
  return <Route {...props} component={RouteGuard(component, RouteGuardScopes.GROUP_BELONG)} />;
}

export default GroupBelongGuardRoute;
