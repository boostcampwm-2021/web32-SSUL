import React from 'react';
import styled from '@emotion/styled';

interface Props {
  name: string | null;
  curUserCnt: number | null;
  maxUserCnt: number | null;
}

function GroupDetailHeader({ name, curUserCnt, maxUserCnt }: Props): JSX.Element {
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
  justify-content: space-between;
  align-items: center;
`;

const GroupName = styled.h2`
  align-self: center;
  color: ${(props) => props.theme.Primary};
`;

const UserCntStatus = styled.div`
  display: flex;
  color: ${(props) => props.theme.Gray4};
`;
export default GroupDetailHeader;
