/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import ExceptionPage from '@pages/ExceptionPage';
import { DESC_BAD_ACCESS, MSG_BAD_ACCESS } from '@constants/consts';

interface ParamProps {
  gid: string;
}

export type authenficateReturnType = (gid?: string) => Promise<null>;

/**
 * @param {React.FC} Page 라우트될 페이지 컴포넌트
 * @param {authenficateReturnType} authenficate 권한 검사 함수
 * @returns 검증 처리 후 컴포넌트
 */
export function RouteGuard(
  Page: RouteProps['component'],
  authenficate: authenficateReturnType,
): (props: RouteProps) => JSX.Element {
  return function guardRoute(props: RouteProps): JSX.Element {
    const Component = Page as React.FC;
    const { gid } = useParams<ParamProps>();
    const [isProgress, setIsProgress] = useState<boolean>(true);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
      (async () => {
        try {
          if (!gid) await authenficate();
          else await authenficate(gid);
          setIsAuth(true);
        } catch (e: any) {
          setIsAuth(false);
        }

        setIsProgress(false);
      })();
    }, []);

    if (isProgress) return <></>;
    if (!isAuth) return <ExceptionPage description={DESC_BAD_ACCESS} message={MSG_BAD_ACCESS} />;
    return <Component {...props} />;
  };
}
