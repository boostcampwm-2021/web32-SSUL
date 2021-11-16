import React from 'react';
import styled from '@emotion/styled';
import GroupInfoHeader from './GroupInfoHeader';
import GroupIntroduction from './GroupIntroduction';
import GroupUserBox from './GroupUserBox';

function GroupInfo(): JSX.Element {
  return (
    <Container>
      <GroupInfoHeader />
      <GroupIntroduction />
      <GroupUserBox />
    </Container>
  );
}

const Container = styled.div``;

export default GroupInfo;
