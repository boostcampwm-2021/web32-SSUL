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
  return (
    <Container>
      <GroupName>{headerProps.name}</GroupName>
      <UserCntStatus>
        {headerProps.curUserCnt}/{headerProps.maxUserCnt}
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
