import React from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@assets/icon_search.png';

function EmptyItem(): JSX.Element {
  return (
    <Container>
      <Icon src={SearchIcon} />
      <EmptyText>아직 알림이 없어요...</EmptyText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.img`
  width: 15px;
  height: 15px;
`;
const EmptyText = styled.p`
  margin: 0;
  margin-left: 10px;
  line-height: 60px;
  text-align: center;
  font-size: 0.9em;
  font-weight: 700;
`;

export default EmptyItem;
