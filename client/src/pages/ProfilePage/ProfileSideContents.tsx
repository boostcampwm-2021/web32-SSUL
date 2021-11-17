import React from 'react';
import styled from '@emotion/styled';
import FeverSharingBar from './FeverSharingBar';
import GithubLogo from '@assets/icon_github_logo.png';
import { useAppSelector } from '@hooks';
import { selectProfileData } from '@store/slices/profileDataSlice';

function ProfileSideContents(): JSX.Element {
  const profile = useAppSelector(selectProfileData);

  return (
    <Container>
      <ProfileImage src={profile.avatarUrl} alt="GithubProfifleImage" />
      <BaseInfo>
        <NickName>{profile.name}</NickName>
        <GithubName>{profile.gitHubId}</GithubName>
        <GithubURLContainer>
          <GithubIcon src={GithubLogo} alt="GithubIcon" />
          <GithubURL href={`https://github.com/${profile.gitHubId}`}>GitHub Storage</GithubURL>
        </GithubURLContainer>
        <FeverSharingBar />
      </BaseInfo>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 40px;
  margin-right: 40px;
  border-radius: 10px;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;

const ProfileImage = styled.img`
  margin: 40px auto;
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

const BaseInfo = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  justify-content: center;
`;

const NickName = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
`;

const GithubName = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
`;

const GithubURLContainer = styled.div`
  display: flex;
  margin: 10px auto 40px auto;
`;

const GithubURL = styled.a`
  text-decoration: none;
  margin-left: 10px;
  color: ${(props) => props.theme.Black};
  &:visited {
    color: ${(props) => props.theme.Black};
  }
  &:hover {
    color: ${(props) => props.theme.Primary};
  }
  &:focus {
    text-decoration: none;
  }
`;

const GithubIcon = styled.img`
  width: 20px;
  height: 20px;
`;
export default ProfileSideContents;
