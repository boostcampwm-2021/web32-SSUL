import React from 'react';
import styled from '@emotion/styled';
import GroupUserBoxItem from './GroupUserBoxItem';

function GroupUserBox(): JSX.Element {
  return (
    <Container>
      <GroupUserBoxItem />
      <GroupUserBoxItem />
    </Container>
  );
}

const Container = styled.div``;

export default GroupUserBox;
