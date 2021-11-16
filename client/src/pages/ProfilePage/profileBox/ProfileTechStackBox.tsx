import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';
import { selectProfileData, setProfileData } from '@store/slices/profileDataSlice';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectUser } from '@store/slices/userSlice';
import { techStackHttpClient } from '@api';

interface Props {
  showModal: () => void;
}

function ProfileTechStackBox({ showModal }: Props): JSX.Element {
  const { techStacks } = useAppSelector(selectProfileData);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProfileTechStack = async () => {
      if (user.id !== undefined) {
        const fetchedTechStack = await techStackHttpClient.getMenteeTechStackList(user.id);
        const techStackList = fetchedTechStack.map(({ name }) => name);
        dispatch(setProfileData({ techStacks: techStackList }));
      }
    };

    fetchProfileTechStack();
  }, [user]);
  return (
    <>
      <ProfileContainer title="기술스택">
        <EditButton onClick={showModal}>편집</EditButton>
        <TechStackContainer>
          {techStacks.map((techStackName, idx) => (
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
