import React from 'react';
import styled from '@emotion/styled';

interface HeaderProps {
  headerProps: Header;
}
interface Header {
  name: string | null;
  curUserCnt: number | null;
  maxUserCnt: number | null;
}

function GroupCardHeader({ headerProps }: HeaderProps): JSX.Element {
  const { name, curUserCnt, maxUserCnt } = headerProps;
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${(props) => props.theme.Primary};
`;

const UserCntStatus = styled.div`
  display: flex;
  color: ${(props) => props.theme.Gray4};
`;

export default GroupCardHeader;
