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
    ownerInfo,
    techStacks,
  } = groupContents;
  const headerProps = { name, curUserCnt, maxUserCnt };
  const statusProps = {
    id,
    intro,
    startAt,
    endAt,
    techStacks,
    ownerInfo,
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
    ownerInfo,
    techStacks,
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
  max-width: 310px;
  margin: 10px;
  padding: 10px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
  border-radius: 10px 10px 10px 10px;
`;

export default GroupCard;
