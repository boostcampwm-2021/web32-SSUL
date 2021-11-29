import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks';
import { selectUser } from '@store/user/globalSlice';
import Logo from './Logo';
import Navigation from './Navigation';
import ThemeSwitch from './ThemeSwitch';
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
          {user.isLogin && (
            <>
              <ThemeSwitch />
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

export default React.memo(Header);
