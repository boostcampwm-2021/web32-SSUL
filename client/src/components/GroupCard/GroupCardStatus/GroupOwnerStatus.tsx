import React, { useState } from 'react';
import styled from '@emotion/styled';

interface Props {
  ownerId: number;
}

function GroupOwnerStatus({ ownerId }: Props): JSX.Element {
  const [groupOwner, setGroupOwner] = useState<string>('홍길동');
  const [groupOwnerFeverStack, setGroupOwnerFeverStack] = useState<number>(0);

  return (
    <Container>
      <GroupOwnerName>{groupOwner}</GroupOwnerName>
      <GroupOnwerFeverStack>{groupOwnerFeverStack}</GroupOnwerFeverStack>
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
