import React from 'react';
import styled from '@emotion/styled';
import GroupOwnerStatus from './GroupOwnerStatus';
import GroupStatusInfo from './GroupStatusInfo';
import GroupTechStackList from './GroupTechStackList';

interface StatusProps {
  statusProps: Status;
}

interface Status {
  id: number;
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
  techStacks: string[];
  ownerFeverStack: number;
  ownerName: string;
  ownerAvatarUrl: string;
}

function GroupCardStatus({ statusProps }: StatusProps): JSX.Element {
  const { intro, startAt, endAt, techStacks, ownerFeverStack, ownerName, ownerAvatarUrl } =
    statusProps;
  return (
    <Container>
      <GroupOwnerStatus
        ownerName={ownerName}
        ownerFeverStack={ownerFeverStack}
        ownerAvatarUrl={ownerAvatarUrl}
      />
      <GroupStatusInfo intro={intro} startAt={startAt} endAt={endAt} />
      <GroupTechStackList techStackList={techStacks} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default GroupCardStatus;
