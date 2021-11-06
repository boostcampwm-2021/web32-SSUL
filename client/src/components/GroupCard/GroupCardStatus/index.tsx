import React from 'react';
import styled from '@emotion/styled';
import GroupOwnerStatus from './GroupOwnerStatus';
import GroupStatusInfo from './GroupStatusInfo';

interface Props {
  id: number;
  ownerId: number;
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
}

function GroupCardStatus({ id, ownerId, intro, startAt, endAt }: Props): JSX.Element {
  return (
    <Container>
      <GroupOwnerStatus ownerId={ownerId} />
      <GroupStatusInfo id={id} intro={intro} startAt={startAt} endAt={endAt} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default GroupCardStatus;
