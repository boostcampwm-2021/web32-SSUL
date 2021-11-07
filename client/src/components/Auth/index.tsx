import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { getAccessToken } from '@api/auth';

function Auth(): JSX.Element {
  const history = useHistory();
  const getGithubToken = async () => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const code = query.code as string;

    try {
      const data = await getAccessToken(code);
      console.log(data);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGithubToken();
  }, []);

  return <div />;
}

export default Auth;
