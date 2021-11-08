import React from 'react';
import styled from '@emotion/styled';
import NavItemList from './NavItemList';

function Navigation(): JSX.Element {
  return (
    <Container>
      <NavItemList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 640px;
  box-sizing: border-box;
`;

export default Navigation;
