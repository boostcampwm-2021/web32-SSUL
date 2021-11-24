/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { RouteProps, useHistory, useParams } from 'react-router-dom';

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
    const history = useHistory();
    const { gid } = useParams<ParamProps>();
    const [isProgress, setIsProgress] = useState<boolean>(true);

    useEffect(() => {
      (async () => {
        try {
          if (!gid) await authenficate();
          else await authenficate(gid);
        } catch (e: any) {
          history.go(-1);
        }

        setIsProgress(false);
      })();
    }, []);

    if (isProgress) return <></>;
    return <Component {...props} />;
  };
}
