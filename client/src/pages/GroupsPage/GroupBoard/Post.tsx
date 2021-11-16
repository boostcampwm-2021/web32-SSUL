import React from 'react';
import styled from '@emotion/styled';

function GroupBoard(): JSX.Element {
  return (
    <Container>
      <Title />
      <SubInfoBox>
        <Writer />
        <Date />
      </SubInfoBox>
    </Container>
  );
}

const Container = styled.div``;
const Title = styled.span``;
const SubInfoBox = styled.div``;
const Writer = styled.span``;
const Date = styled.span``;

export default GroupBoard;
