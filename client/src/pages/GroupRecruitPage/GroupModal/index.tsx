import React from 'react';
import styled from '@emotion/styled';
import { GroupDetail } from '@types';
import GroupDetailHeader from './GroupDetailHeader';
import GroupDetailStatus from './GroupDetailStatus';

interface Props {
  contents: GroupDetail;
}

function GroupModal({ contents }: Props): JSX.Element {
  const {
    name,
    curUserCnt,
    maxUserCnt,
    techStackList,
    ownerName,
    ownerAvatarUrl,
    intro,
    endAt,
    startAt,
  } = contents;

  return (
    <Container>
      <h3>그룹 소개</h3>
      <GroupDetailHeader {...{ name, curUserCnt, maxUserCnt }} />
      <GroupDetailStatus {...{ techStackList, ownerName, ownerAvatarUrl, intro, endAt, startAt }} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export default GroupModal;
