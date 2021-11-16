import React from 'react';
import styled from '@emotion/styled';

function GroupUserBoxItem(): JSX.Element {
  return (
    <Container>
      <Image />
      <Name>김동규ㄴ112</Name>
    </Container>
  );
}

const Container = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 70%;
  border: 0.0625rem solid #f2f2f2;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  background-size: cover;
  cursor: pointer;
  background-image: url(https://camo.githubusercontent.com/614e69129cbd90e364e863ad2de097121dd289e693e8b611a039dda08d7c3403/68747470733a2f2f692e696d6775722e636f6d2f665a346378737a2e706e67);
`;
const Name = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${(props) => props.theme.Gray1};
  overflow: hidden;
`;

export default GroupUserBoxItem;
