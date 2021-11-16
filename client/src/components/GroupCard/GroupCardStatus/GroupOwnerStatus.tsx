import React from 'react';
import styled from '@emotion/styled';

interface Props {
  ownerName: string;
  ownerFeverStack: number;
  ownerAvatarUrl: string;
}

function GroupOwnerStatus({ ownerName, ownerFeverStack, ownerAvatarUrl }: Props): JSX.Element {
  const DEFAULT_INDEX = 30;
  return (
    <Container>
      <GroupOwnerProfile>
        <ProfileImage src={ownerAvatarUrl} />
        <ProfileName>{ownerName}</ProfileName>
      </GroupOwnerProfile>
      <GroupOwnerFeverStack style={{ width: `${ownerFeverStack + DEFAULT_INDEX}px` }}>
        <FeverNum>{ownerFeverStack}</FeverNum>
      </GroupOwnerFeverStack>
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

const GroupOwnerFeverStack = styled.div`
  height: 20px;
  width: ${(props) => props.style?.width};
  align-self: center;
  background-color: ${(props) => props.theme?.Fever};
  border-radius: 10px;
  cursor: pointer;

  &:hover > span {
    display: flex;
    color: ${(props) => props.theme?.White};
  }
`;

const FeverNum = styled.span`
  display: none;
  justify-content: center;
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
