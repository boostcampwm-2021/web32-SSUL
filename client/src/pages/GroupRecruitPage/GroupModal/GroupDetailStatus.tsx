import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { calculateStudyTime, formatDateToString } from '@utils/Date';
import { OwnerInfo } from '@types';

interface Props {
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
  techStacks: string[];
  ownerInfo: OwnerInfo;
}

function GroupDetailStatus({ techStacks, ownerInfo, intro, startAt, endAt }: Props): JSX.Element {
  const renderTechStackList = techStacks.map((techStack, idx) => {
    return <TechListItem key={idx}>{techStack} </TechListItem>;
  });
  return (
    <Container>
      <StatusHeader>
        <GroupOwnerProfile>
          <ProfileLink to={{ pathname: `/profile/${ownerInfo.githubId}` }}>
            <ProfileImage src={ownerInfo.avatarUrl} alt="깃허브 이미지"></ProfileImage>
          </ProfileLink>
          <ProfileName>{ownerInfo.name}</ProfileName>
        </GroupOwnerProfile>
        <TechList>{renderTechStackList}</TechList>
      </StatusHeader>
      <GroupDate>
        {formatDateToString(startAt)} ~ {formatDateToString(endAt)}(
        {calculateStudyTime(startAt, endAt)})
      </GroupDate>
      <GroupIntro value={String(intro)} readOnly></GroupIntro>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 350px;
  justify-content: space-between;
  flex-direction: column;
`;

const ProfileLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-align: center;

  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  color: ${(props) => props.theme.White};
  background-color: ${(props) => props.theme.Primary};

  &:hover {
    color: ${(props) => props.theme.White};
  }
`;

const GroupDate = styled.h5`
  margin: 10px;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const GroupOwnerProfile = styled.div`
  display: flex;
  justify-content: space-between;
  width: 18%;
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
  padding: 0px 8px;

  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  border-radius: 10px;
  border: none;
`;
export default GroupDetailStatus;
