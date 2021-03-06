import React from 'react';
import styled from '@emotion/styled';
import GroupOwnerStatus from './GroupOwnerStatus';
import GroupStatusInfo from './GroupStatusInfo';
import GroupTechStackList from './GroupTechStackList';
import { OwnerInfo, TechStack } from '@types';

interface StatusProps {
  statusProps: Status;
}

interface Status {
  id: number;
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
  techStacks: TechStack[];
  ownerInfo: OwnerInfo;
}

function GroupCardStatus({ statusProps }: StatusProps): JSX.Element {
  const { intro, startAt, endAt, techStacks, ownerInfo } = statusProps;
  return (
    <Container>
      <GroupOwnerStatus ownerInfo={ownerInfo} />
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
