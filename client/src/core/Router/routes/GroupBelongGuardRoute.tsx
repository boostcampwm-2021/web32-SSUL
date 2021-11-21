import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import RouteGuard from '@core/Guard/RouteGaurd';
import { RouteGuardTypes } from '@core/Guard/RouteGaurd';

function GroupBelongGuardRoute(props: RouteProps): JSX.Element {
  const component: RouteProps['component'] = props.component;
  return <Route {...props} component={RouteGuard(component, RouteGuardTypes.GROUP_BELONG)} />;
}

export default GroupBelongGuardRoute;
