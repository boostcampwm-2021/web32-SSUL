import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { useAppDispatch, useLoader } from '@hooks';
import { getAccessToken } from '@api/auth';
import { setUser } from '@store/slices/userSlice';

function Auth(): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const toggleLoader = useLoader();

  const getGithubToken = async () => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const code = query.code as string;

    try {
      const data = await getAccessToken(code);
      const { id, githubId: oAuthId, name, avatarUrl: image, feverStack, shareStack } = data;
      dispatch(setUser({ id, oAuthId, name, image, feverStack, shareStack }));
      toggleLoader();
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    toggleLoader();
    getGithubToken();
  }, []);

  return <Content />;
}

const Content = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

export default Auth;
