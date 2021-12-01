import React from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';
import { useAppSelector } from '@hooks';
import { selectProfileData } from '@store/user/profileSlice';
import { selectUser } from '@store/user/globalSlice';
import {
  MENTORING_REQUEST_LIST,
  MENTORING_TECH_STACK,
  MENTOR_APPLY_TEXT,
  DESC_APPLY_MENTOR,
  SUGGEST_BE_MENTOR,
} from '@constants/consts';
import { ProfileViewType } from '@constants/enums';

interface Props {
  showRequestModal: () => void;
  showCreateModal: () => void;
}

function ProfileMentorStackBox({ showCreateModal, showRequestModal }: Props): JSX.Element {
  const profile = useAppSelector(selectProfileData);
  const user = useAppSelector(selectUser);

  const getContentsElement = (type: number) => {
    switch (type) {
      case ProfileViewType.OTHER:
        return (
          <ProfileContainer title={MENTORING_TECH_STACK}>
            <TechStackContainer>
              {profile.mentoringStack.map((techStack) => (
                <TechStackItem key={techStack.id}>{techStack.name}</TechStackItem>
              ))}
            </TechStackContainer>
          </ProfileContainer>
        );
      case ProfileViewType.MENTOR:
        return (
          <ProfileContainer title={MENTORING_TECH_STACK}>
            <MentoringRequestButton data-test="mentoring-request-list" onClick={showRequestModal}>
              {MENTORING_REQUEST_LIST}
            </MentoringRequestButton>
            <TechStackContainer>
              {profile.mentoringStack.map((techStack) => (
                <TechStackItem data-test="mentor-techstack" key={techStack.id}>
                  {techStack.name}
                </TechStackItem>
              ))}
            </TechStackContainer>
          </ProfileContainer>
        );
      case ProfileViewType.NOT_MENTOR:
        return (
          <ProfileContainer title="">
            <MentorRegisterTitle>{SUGGEST_BE_MENTOR}</MentorRegisterTitle>
            <MentorRegisterDesc>{DESC_APPLY_MENTOR}</MentorRegisterDesc>
            <MentorRegisterButton data-test="metor-apply" onClick={showCreateModal}>
              {MENTOR_APPLY_TEXT}
            </MentorRegisterButton>
          </ProfileContainer>
        );
    }
  };
  const getViewType = (): number => {
    if (profile.userId !== user.id) return ProfileViewType.OTHER;
    else if (profile.isMentor) return ProfileViewType.MENTOR;
    else return ProfileViewType.NOT_MENTOR;
  };

  return <>{getContentsElement(getViewType())}</>;
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
    background-color: ${(props) => props.theme.PrimaryHover};
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
  cursor: pointer;
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

  &:hover {
    background-color: ${(props) => props.theme.PrimaryHover};
  }
`;
export default ProfileMentorStackBox;
