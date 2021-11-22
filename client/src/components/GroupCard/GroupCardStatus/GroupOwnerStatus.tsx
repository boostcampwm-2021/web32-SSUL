import React from 'react';
import styled from '@emotion/styled';
import { OwnerInfo } from '@types';

interface Props {
  ownerInfo: OwnerInfo;
}

function GroupOwnerStatus({ ownerInfo }: Props): JSX.Element {
  const DEFAULT_INDEX = 30;
  return (
    <Container>
      <GroupOwnerProfile>
        <ProfileImage src={ownerInfo.avatarUrl} />
        <ProfileName>{ownerInfo.name}</ProfileName>
      </GroupOwnerProfile>
      <GroupOwnerFeverStack style={{ width: `${ownerInfo.feverStack + DEFAULT_INDEX}px` }}>
        <FeverNum>{ownerInfo.feverStack}</FeverNum>
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
