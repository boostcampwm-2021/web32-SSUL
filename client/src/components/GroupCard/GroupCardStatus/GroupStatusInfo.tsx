import React from 'react';
import styled from '@emotion/styled';
import { calculateStudyTime, formatDateToString } from '@utils/Date';

interface Props {
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
}

function GroupStatusInfo({ intro, startAt, endAt }: Props): JSX.Element {
  return (
    <Container>
      <GroupIntro>{intro}</GroupIntro>
      <GroupDate>
        {formatDateToString(startAt)} ~ {formatDateToString(endAt)}(
        {calculateStudyTime(startAt, endAt)})
      </GroupDate>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  padding: 10px;
  justify-content: space-between;
`;

const GroupIntro = styled.h5`
  width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${(props) => props.theme.Gray4};
`;

const GroupDate = styled.h6``;

export default GroupStatusInfo;
