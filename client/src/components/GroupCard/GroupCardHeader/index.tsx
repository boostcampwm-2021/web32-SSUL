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
      <GroupName>{name}</GroupName>
      <UserCntStatus>
        {curUserCnt}/{maxUserCnt}
      </UserCntStatus>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
  align-items: center;
`;

const GroupName = styled.h2`
  color: ${(props) => props.theme.Primary};
`;

const UserCntStatus = styled.div`
  display: flex;
  color: ${(props) => props.theme.Gray4};
`;

export default GroupCardHeader;
