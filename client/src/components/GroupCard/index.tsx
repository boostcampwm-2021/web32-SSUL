import React from 'react';
import styled from '@emotion/styled';
import GroupCardHeader from './GroupCardHeader';
import GroupCardStatus from './GroupCardStatus';
import GroupApplyButton from './GroupApplyButton';
import { Group, GroupState } from '../../types/Group';
const dummyData: Group = {
  id: 1,
  mentorId: 1010,
  ownerId: 2020,
  name: 'REACT',
  maxUserCnt: 5,
  curUserCnt: 2,
  intro: '',
  startAt: new Date(),
  endAt: new Date(),
  status: GroupState.DOING,
};

function GroupCard(): JSX.Element {
  const { name, maxUserCnt, curUserCnt, ownerId, intro, startAt, endAt } = dummyData;
  return (
    <Card>
      <GroupCardHeader name={name} maxUserCnt={maxUserCnt} curUserCnt={curUserCnt} />
      <GroupCardStatus ownerId={ownerId} intro={intro} startAt={startAt} endAt={endAt} />
      <GroupApplyButton />
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 10px 10px;
`;

export default GroupCard;
