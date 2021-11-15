import React from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';

interface Props {
  handleEditButtonClick: () => void;
}

function ProfileTechStackBox({ handleEditButtonClick }: Props): JSX.Element {
  const techStackList = ['c++', 'java', 'javascript'];
  return (
    <>
      <ProfileContainer title="기술스택">
        <EditButton onClick={handleEditButtonClick}>편집</EditButton>
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

const EditButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px 20px 0 0;
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
`;

export default ProfileTechStackBox;
