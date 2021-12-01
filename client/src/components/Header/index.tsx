import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks';
import { selectUser } from '@store/user/globalSlice';
import Logo from './Logo';
import Navigation from './Navigation';
import ThemeSwitch from './ThemeSwitch';
import Notification from './Notification';
import Profile from './Profile';

function Header(): JSX.Element {
  const user = useAppSelector(selectUser);
  return (
    <Container>
      <Content>
        <LeftSideNav>
          <Logo />
          <Navigation />
        </LeftSideNav>
        <RightSideNav>
          <ThemeSwitch />
          {user.isLogin && <Notification />}
          <Profile />
        </RightSideNav>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1040px;
  height: 80px;
  padding: 12px 32px 0px 32px;
  background-color: ${(props) => props.theme.Box};
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.Gray5};
  box-shadow: ${(props) => props.theme.Shadow};
  z-index: 9999;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 65vw;
  min-width: 1040px;
`;

const LeftSideNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 50vw;
  min-width: 480x;
`;

const RightSideNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 10vw;
  min-width: 190px;
`;

export default React.memo(Header);
