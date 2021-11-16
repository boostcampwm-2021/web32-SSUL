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
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

const BoxContainer = styled(HorizontalLayout)`
  justify-content: space-between;
  align-items: start;
  height: auto;
`;

export default GroupInfo;
