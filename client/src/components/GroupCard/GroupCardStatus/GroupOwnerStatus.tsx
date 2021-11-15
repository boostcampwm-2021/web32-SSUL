import React from 'react';
import styled from '@emotion/styled';

interface Props {
  ownerName: string;
  ownerFeverStack: number;
}

function GroupOwnerStatus({ ownerName, ownerFeverStack }: Props): JSX.Element {
  return (
    <Container>
      <GroupOwnerName>{ownerName}</GroupOwnerName>
      <GroupOnwerFeverStack>{ownerFeverStack}</GroupOnwerFeverStack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
`;

const GroupOwnerName = styled.h4`
  display: flex;
`;

const GroupOnwerFeverStack = styled.h4`
  display: flex;
`;

export default GroupOwnerStatus;
