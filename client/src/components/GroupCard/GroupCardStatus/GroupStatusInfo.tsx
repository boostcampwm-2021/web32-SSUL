import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';

interface Props {
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
}

function GroupStatusInfo({ intro, startAt, endAt }: Props): JSX.Element {
  const formatDate = (date: Date | null) => {
    return moment(date).format('YYYY-MM-DD');
  };
  return (
    <Container>
      <GroupIntro>{intro}</GroupIntro>
      <GroupDate>
        {formatDate(startAt)} ~ {formatDate(endAt)}
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
