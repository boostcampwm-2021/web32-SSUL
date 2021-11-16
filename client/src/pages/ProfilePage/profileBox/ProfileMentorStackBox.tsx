import React, { useState } from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';
import { useAppSelector } from '@hooks';
import { selectProfileData } from '@store/slices/profileDataSlice';

interface Props {
  showModal: () => void;
}

function ProfileMentorStackBox({ showModal }: Props): JSX.Element {
  const { techStacks } = useAppSelector(selectProfileData);
  const [isMentor] = useState<boolean>(false);
  return (
    <>
      {isMentor ? (
        <ProfileContainer title="멘토링스택">
          <MentoringRequestButton>멘토요청 리스트</MentoringRequestButton>
          <TechStackContainer>
            {techStacks.map((techStackName, idx) => (
              <TechStackItem key={idx}>{techStackName}</TechStackItem>
            ))}
          </TechStackContainer>
        </ProfileContainer>
      ) : (
        <ProfileContainer title="">
          <MentorRegisterTitle>멘토가 되어주세요!</MentorRegisterTitle>
          <MentorRegisterDesc>
            간단한 기술스택을 등록을 통해 멘토가 될 수 있어요!
          </MentorRegisterDesc>
          <MentorRegisterButton onClick={showModal}>멘토 신청하기</MentorRegisterButton>
        </ProfileContainer>
      )}
    </>
  );
}

const MentorRegisterTitle = styled.h3`
  margin-top: 30px;
  font-weight: bold;
  text-align: center;
`;

const MentorRegisterDesc = styled.p`
  color: #b5b5b5;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
`;

const MentorRegisterButton = styled.button`
  cursor: pointer;
  width: 200px;
  height: 50px;
  margin-left: 225px;
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.White};
  background-color: ${(props) => props.theme.Primary};
  font-weight: bold;

  &:hover {
    background-color: #00a18d;
  }
`;

const TechStackContainer = styled.div`
  display: flex;
  margin: 10px;
`;

const TechStackItem = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  font-weight: 500;
  color: ${(props) => props.theme.Primary};
  border: 1px ${(props) => props.theme.Gray5} solid;
  border-radius: 10px;
`;

const MentoringRequestButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px 20px 0 0;
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
`;
export default ProfileMentorStackBox;
