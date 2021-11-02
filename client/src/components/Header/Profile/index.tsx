import React from 'react';
import styled from '@emotion/styled';

function User(): JSX.Element {
  return <Container></Container>;
}

const Container = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 70%;
  border: 0.0625rem solid #f2f2f2;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

export default User;
