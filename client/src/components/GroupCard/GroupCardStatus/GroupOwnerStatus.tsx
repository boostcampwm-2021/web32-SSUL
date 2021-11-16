import React from 'react';
import styled from '@emotion/styled';

interface Props {
  ownerName: string;
  ownerFeverStack: number;
  ownerAvatarUrl: string;
}

function GroupOwnerStatus({ ownerName, ownerFeverStack, ownerAvatarUrl }: Props): JSX.Element {
  return (
    <Container>
      <GroupOwnerProfile>
        <ProfileImage src={ownerAvatarUrl} />
        <ProfileName>{ownerName}</ProfileName>
      </GroupOwnerProfile>
      <GroupOnwerFeverStack>{ownerFeverStack}</GroupOnwerFeverStack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
`;

const GroupOwnerProfile = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

const GroupOnwerFeverStack = styled.h3`
  display: flex;
  margin: 10px 0;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ProfileName = styled.h4`
  display: flex;
  margin: 14px 0;
`;
export default GroupOwnerStatus;
