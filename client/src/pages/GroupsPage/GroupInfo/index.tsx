import React from 'react';
import styled from '@emotion/styled';
import GroupInfoHeader from './GroupInfoHeader';
import GroupIntroduction from './GroupIntroduction';
import GroupUserBox from './GroupUserBox';
import { HorizontalLayout } from '@styles';

function GroupInfo(): JSX.Element {
  return (
    <Container>
      <GroupInfoHeader />
      <BoxContainer>
        <GroupIntroduction />
        <GroupUserBox />
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 1080px;
  min-height: 360px;
  padding: 20px 24px 20px 24px;
  border-radius: 24px;
  box-shadow: ${(props) => props.theme.Shadow};
  margin-bottom: 64px;
  background-color: ${(props) => props.theme.Box};
`;

const BoxContainer = styled(HorizontalLayout)`
  justify-content: space-between;
  align-items: start;
  height: auto;
`;

export default GroupInfo;
