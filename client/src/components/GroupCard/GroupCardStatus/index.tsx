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
  techStackList: string[];
  ownerFeverStack: number;
  ownerName: string;
}

function GroupCardStatus({ statusProps }: StatusProps): JSX.Element {
  const { intro, startAt, endAt, techStackList, ownerFeverStack, ownerName } = statusProps;
  return (
    <Container>
      <GroupOwnerStatus ownerName={ownerName} ownerFeverStack={ownerFeverStack} />
      <GroupStatusInfo intro={intro} startAt={startAt} endAt={endAt} />
      <GroupTechStackList techStackList={techStackList} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default GroupCardStatus;
