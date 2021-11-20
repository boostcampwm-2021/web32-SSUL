import React from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';
import { selectProfileData } from '@store/user/profileSlice';
import { useAppSelector } from '@hooks';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/user/globalSlice';

interface Props {
  showModal: () => void;
}

function ProfileTechStackBox({ showModal }: Props): JSX.Element {
  const { techStacks } = useAppSelector(selectProfileData);
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfileData);

  const getEditButtonElement = (): JSX.Element => {
    if (user.id === profile.userId) {
      return <EditButton onClick={showModal}>편집</EditButton>;
    } else {
      return <></>;
    }
  };

  return (
    <>
      <ProfileContainer title="기술스택">
        {getEditButtonElement()}
        <TechStackContainer>
          {techStacks.map((techStack) => (
            <TechStackItem key={techStack.id}>{techStack.name}</TechStackItem>
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
  cursor: pointer;
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

  &:hover {
    background-color: ${(props) => props.theme.PrimaryHover};
  }
`;

export default ProfileTechStackBox;
