import React from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { useAppSelector } from '@hooks';
import { selectLoginFlag } from '@store/user/globalSlice';

export enum RouteGuardTypes {
  AUTH = 'AUTH',
  GROUP_BELONG = 'GROUP_BELONG',
  GROUP_OWNER = 'GROUP_OWNER',
}
/**
 * @param {React.FC} Page 라우트될 페이지 컴포넌트
 * @param {RouteGuardTypes} type 보호 범위
 * @returns 검증 처리 후 컴포넌트
 */
export default function RouteGuard(
  Page: RouteProps['component'],
  type?: RouteGuardTypes,
): (props: RouteProps) => JSX.Element {
  return function guardRoute(props: RouteProps): JSX.Element {
    const Component = Page as React.FC;
    const history = useHistory();
    const isLogin = useAppSelector(selectLoginFlag);

    switch (type) {
      case RouteGuardTypes.AUTH:
        if (!isLogin) history.go(-1);
        return <Component {...props} />;
        break;
      case RouteGuardTypes.GROUP_BELONG:
        break;
      case RouteGuardTypes.GROUP_OWNER:
        break;
    }
    return <Component {...props} />;
  };
}
