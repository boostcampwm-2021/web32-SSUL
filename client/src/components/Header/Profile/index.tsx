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
  background-image: url(https://camo.githubusercontent.com/614e69129cbd90e364e863ad2de097121dd289e693e8b611a039dda08d7c3403/68747470733a2f2f692e696d6775722e636f6d2f665a346378737a2e706e67);
  background-size: cover;
  cursor: pointer;
`;

export default User;
