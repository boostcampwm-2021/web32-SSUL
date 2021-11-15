import React from 'react';
import styled from '@emotion/styled';
import GroupCardHeader from './GroupCardHeader';
import GroupCardStatus from './GroupCardStatus';
import GroupApplyButton from './GroupApplyButton';
import { GroupResponse } from '@types';

interface CardProps {
  groupContents: GroupResponse;
}

function GroupCard({ groupContents }: CardProps): JSX.Element {
  const {
    id,
    name,
    maxUserCnt,
    curUserCnt,
    intro,
    startAt,
    endAt,
    ownerFeverStack,
    techStackList,
    ownerName,
  } = groupContents;
  const headerProps = { name, curUserCnt, maxUserCnt };
  const statusProps = {
    id,
    ownerFeverStack,
    intro,
    startAt,
    endAt,
    techStackList,
    ownerName,
  };
  return (
    <Card>
      <GroupCardHeader headerProps={headerProps} />
      <GroupCardStatus statusProps={statusProps} />
      <GroupApplyButton />
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  margin: 10px;
  padding: 10px;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 10px 10px;
`;

export default GroupCard;
