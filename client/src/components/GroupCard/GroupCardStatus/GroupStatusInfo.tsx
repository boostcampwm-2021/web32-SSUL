import React from 'react';
import styled from '@emotion/styled';

interface Props {
  id: number;
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
}

function GroupStatusInfo({ id, intro, startAt, endAt }: Props): JSX.Element {
  const getGroupTechStackList = () => {
    // id를 이용해 가져오기
    id;
  };
  return (
    <Container>
      <GroupIntro>{intro}</GroupIntro>
      <GroupDate>
        {startAt?.toLocaleDateString()} ~ {endAt?.toLocaleDateString()}
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
