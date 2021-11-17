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

const MAX_NAME_LENGTH = 10;

function GroupCardHeader({ headerProps }: HeaderProps): JSX.Element {
  const { name, curUserCnt, maxUserCnt } = headerProps;
  const printGroupName = (baseGroupName: string) => {
    const changeGroupName =
      baseGroupName.length > MAX_NAME_LENGTH
        ? `${baseGroupName?.substring(0, MAX_NAME_LENGTH)}...`
        : baseGroupName;
    return `${changeGroupName}`;
  };

  return (
    <Container>
      <GroupName>{printGroupName(String(name))}</GroupName>
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
