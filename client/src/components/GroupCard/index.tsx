import React from 'react';
import styled from '@emotion/styled';
import GroupCardHeader from './GroupCardHeader';
import GroupCardStatus from './GroupCardStatus';
import GroupApplyButton from './GroupApplyButton';
import { Group } from '../../types/Group';

interface Props {
  groupContents: Group;
}

function GroupCard({ groupContents }: Props): JSX.Element {
  const { id, name, maxUserCnt, curUserCnt, ownerId, intro, startAt, endAt } = groupContents;
  return (
    <Card>
      <GroupCardHeader name={name} maxUserCnt={maxUserCnt} curUserCnt={curUserCnt} />
      <GroupCardStatus id={id} ownerId={ownerId} intro={intro} startAt={startAt} endAt={endAt} />
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
