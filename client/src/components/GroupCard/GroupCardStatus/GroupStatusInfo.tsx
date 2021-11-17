import React from 'react';
import styled from '@emotion/styled';
import { calculateStudyTime, formatDateToString } from '@utils/Date';

interface Props {
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
}

const MAX_INTRO_LENGTH = 25;

function GroupStatusInfo({ intro, startAt, endAt }: Props): JSX.Element {
  const printIntro = (baseIntro: string) => {
    const changeIntro =
      baseIntro.length > MAX_INTRO_LENGTH
        ? `${baseIntro?.substring(0, MAX_INTRO_LENGTH)}...`
        : baseIntro;
    return `${changeIntro}`;
  };

  return (
    <Container>
      <GroupIntro>{printIntro(String(intro))}</GroupIntro>
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
  height: 50px;
  padding: 10px;
  justify-content: space-between;
`;

const GroupIntro = styled.h5`
  color: ${(props) => props.theme.Gray4};
`;

const GroupDate = styled.h6``;

export default GroupStatusInfo;
