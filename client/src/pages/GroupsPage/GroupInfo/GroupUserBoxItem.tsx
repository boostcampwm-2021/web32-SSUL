import React from 'react';
import styled from '@emotion/styled';

function GroupUserBoxItem(): JSX.Element {
  return (
    <Container>
      <Image />
      <Name />
    </Container>
  );
}

const Container = styled.div``;
const Image = styled.img``;
const Name = styled.span``;

export default GroupUserBoxItem;
