import React from 'react';
import styled from '@emotion/styled';
import { NOTIFICATION_EMPTY_MESSAGE } from '@constants/consts';

function EmptyItem(): JSX.Element {
  return (
    <Container>
      <EmptyText>{NOTIFICATION_EMPTY_MESSAGE}</EmptyText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
