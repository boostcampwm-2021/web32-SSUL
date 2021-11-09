import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks';
import { selectUser } from '@store/slices/userSlice';
import Logo from './Logo';
import Navigation from './Navigation';
import RoleSwitch from './RoleSwitch';
import Notification from './Notification';
import Messenger from './Messenger';
import Profile from './Profile';

function Header(): JSX.Element {
  const user = useAppSelector(selectUser);
  return (
    <Container>
      <Content>
        <Logo />
        <Navigation />
        <ControllContent>
          {user.id && (
            <>
              <RoleSwitch />
              <Messenger />
              <Notification />
            </>
          )}
        </ControllContent>
        <Profile />
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
  min-width: 1040px;
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
  min-width: 1040px;
`;

const ControllContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 20vw;
  min-width: 240px;
`;

export default Header;
