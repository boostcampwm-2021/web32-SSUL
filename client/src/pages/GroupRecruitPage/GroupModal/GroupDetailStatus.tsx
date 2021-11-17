import React from 'react';
import styled from '@emotion/styled';

interface Props {
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
  techStackList: string[];
  ownerName: string;
  ownerAvatarUrl: string;
}

function GroupDetailStatus({
  techStackList,
  ownerName,
  ownerAvatarUrl,
  intro,
}: Props): JSX.Element {
  const renderTechStackList = techStackList.map((techStack, idx) => {
    return <TechListItem key={idx}>{techStack} </TechListItem>;
  });
  return (
    <Container>
      <StatusHeader>
        <GroupOwnerProfile>
          <ProfileImage src={ownerAvatarUrl} />
          <ProfileName>{ownerName}</ProfileName>
        </GroupOwnerProfile>
        <TechList>{renderTechStackList}</TechList>
      </StatusHeader>
      <GroupIntro value={String(intro)} readOnly></GroupIntro>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 350px;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const GroupOwnerProfile = styled.div`
  display: flex;
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
const GroupIntro = styled.textarea`
  padding: 10px;
  height: 80%;
  border-radius: 10px;
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  resize: none;
  overflow-y: auto;
  border: none;
  outline: none;
  color: ${(props) => props.theme.Gray4};
`;

const TechList = styled.div`
  display: flex;
  margin: 10px;
`;

const TechListItem = styled.button`
  display: flex;
  margin: 5px;
  padding: 10px;

  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
  border: none;
`;
export default GroupDetailStatus;
