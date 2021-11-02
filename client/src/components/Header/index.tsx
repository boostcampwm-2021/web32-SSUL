import React from 'react';
import styled from '@emotion/styled';
import Logo from './Logo';

function Header(): JSX.Element {
  return (
    <Container>
      <Logo />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0px 32px 0px 32px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

export default Header;
