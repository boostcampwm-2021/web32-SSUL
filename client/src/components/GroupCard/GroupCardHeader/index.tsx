import React from 'react';
import styled from '@emotion/styled';

interface Props {
  name: string | null;
  maxUserCnt: number | null;
  curUserCnt: number | null;
}

function GroupCardHeader({ name, maxUserCnt, curUserCnt }: Props): JSX.Element {
  return (
    <Container>
      <h2>{name}</h2>
      <UserCntStatus>
        {curUserCnt}/{maxUserCnt}
      </UserCntStatus>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const UserCntStatus = styled.div`
  display: flex;
  color: ${(props) => props.theme.Gray4};
`;

export default GroupCardHeader;
