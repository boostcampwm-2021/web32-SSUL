import React from 'react';
import styled from '@emotion/styled';
import { GroupCardDetail } from '@types';
import GroupDetailHeader from './GroupDetailHeader';
import GroupDetailStatus from './GroupDetailStatus';
import GroupDetailTitle from './GroupDetailTitle';
import GroupDetailFooter from './GroupDetailFooter';
import { calculateRemainTimeFromNow } from '@utils/Date';

interface Props {
  contents: GroupCardDetail;
}

function GroupModal({ contents }: Props): JSX.Element {
  const {
    id,
    name,
    curUserCnt,
    maxUserCnt,
    category,
    ownerInfo,
    techStacks,
    intro,
    endAt,
    startAt,
  } = contents;

  return (
    <Container>
      <GroupDetailTitle {...{ category }} />
      <GroupDetailHeader {...{ name, curUserCnt, maxUserCnt }} />
      <GroupDetailStatus
        {...{
          techStacks,
          ownerInfo,
          intro,
          endAt,
          startAt,
        }}
      />
      <GroupDetailFooter groupId={id} remainDate={calculateRemainTimeFromNow(startAt)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export default GroupModal;
