import React from 'react';
import styled from '@emotion/styled';

function RoleSwitch(): JSX.Element {
  return (
    <Container>
      <Range />
      <Button />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 48px;
  height: 24px;
  border-radius: 24px;
  padding: 4px 8px 4px 8px;
  margin: 0px 24px 0px 24px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

const Range = styled.div`
  position: absolute;
  width: 32px;
  height: 12px;
  background-color: ${(props) => props.theme.Gray6};
  border-radius: 24px;
  box-sizing: border-box;
`;

const Button = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.theme.Primary};
  border-radius: 24px;
  box-sizing: border-box;
  z-index: 999;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

export default RoleSwitch;
