import React from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';

function ProfileMentorStackBox(): JSX.Element {
  const techStackList = ['c++', 'java', 'javascript'];
  return (
    <>
      <ProfileContainer title="멘토링스택">
        <MentoringRequestButton>멘토요청 리스트</MentoringRequestButton>
        <TechStackContainer>
          {techStackList.map((techStackName, idx) => (
            <TechStackItem key={idx}>{techStackName}</TechStackItem>
          ))}
        </TechStackContainer>
      </ProfileContainer>
    </>
  );
}

const TechStackContainer = styled.div`
  display: flex;
  margin: 10px;
`;

const TechStackItem = styled.div`
  display: flex;
  margin: 0 10px;
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
