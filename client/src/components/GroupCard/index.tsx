import React from 'react';
import styled from '@emotion/styled';
import GroupCardHeader from './GroupCardHeader';
import GroupCardStatus from './GroupCardStatus';
import GroupApplyButton from './GroupApplyButton';
import { Group } from '@types';
import { calculateRemainTimeFromNow } from '@utils/Date';

interface CardProps {
  groupContents: Group;
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
    category,
    ownerFeverStack,
    techStacks,
    ownerName,
    ownerAvatarUrl,
    ownerGithubId,
  } = groupContents;
  const headerProps = { name, curUserCnt, maxUserCnt };
  const statusProps = {
    id,
    ownerFeverStack,
    intro,
    startAt,
    endAt,
    techStacks,
    ownerName,
    ownerAvatarUrl,
  };

  const contents = {
    id,
    name,
    maxUserCnt,
    curUserCnt,
    intro,
    startAt,
    endAt,
    category,
    techStackList,
    ownerName,
    ownerAvatarUrl,
    ownerGithubId,
  };

  return (
    <Card>
      <GroupCardHeader headerProps={headerProps} />
      <GroupCardStatus statusProps={statusProps} />
      <GroupApplyButton contents={contents} dueDate={calculateRemainTimeFromNow(startAt)} />
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
