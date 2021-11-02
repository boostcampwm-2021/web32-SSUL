import React from 'react';
import styled from '@emotion/styled';
import Logo from './Logo';
import Navigation from './Navigation';
import RoleSwitch from './RoleSwitch';
import Notification from './Notification';
import Messanger from './Messanger';

function Header(): JSX.Element {
  return (
    <Container>
      <Content>
        <Logo />
        <Navigation />
        <RoleSwitch />
        <Messanger />
        <Notification />
        {/* 프로필 버튼 */}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 12px 32px 0px 32px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 75vw;
  min-width: 800px;
  box-sizing: border-box;
`;

export default Header;
