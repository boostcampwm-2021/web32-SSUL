/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { RouteProps, useHistory, useParams } from 'react-router-dom';
import { authHttpClient } from '@api';

interface ParamProps {
  gid: string;
}

export enum RouteGuardScopes {
  AUTH = 'AUTH',
  GROUP_BELONG = 'GROUP_BELONG',
  GROUP_OWNER = 'GROUP_OWNER',
}

/**
 * @param {React.FC} Page 라우트될 페이지 컴포넌트
 * @param {RouteGuardScopes} scope 보호 범위
 * @returns 검증 처리 후 컴포넌트
 */
export default function RouteGuard(
  Page: RouteProps['component'],
  scope?: RouteGuardScopes,
): (props: RouteProps) => JSX.Element {
  return function guardRoute(props: RouteProps): JSX.Element {
    const Component = Page as React.FC;
    const history = useHistory();
    const { gid } = useParams<ParamProps>();

    useEffect(() => {
      (async () => {
        try {
          switch (scope) {
            case RouteGuardScopes.AUTH:
              await authHttpClient.isAuthUser();
              break;
            case RouteGuardScopes.GROUP_BELONG:
              await authHttpClient.isGroupBelong(gid);
              break;
            case RouteGuardScopes.GROUP_OWNER:
              await authHttpClient.isGroupOwner(gid);
              break;
          }
        } catch (e: any) {
          history.go(-1);
        }
      })();
    }, []);

    return <Component {...props} />;
  };
}
