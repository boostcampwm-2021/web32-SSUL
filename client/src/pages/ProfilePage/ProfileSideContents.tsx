import React from 'react';
import styled from '@emotion/styled';
import FeverSharingBar from './FeverSharingBar';
import GithubLogo from '@assets/icon_github_logo.png';
import { useAppSelector } from '@hooks';
import { selectProfileData } from '@store/user/profileSlice';

function ProfileSideContents(): JSX.Element {
  const profile = useAppSelector(selectProfileData);

  return (
    <Container>
      <ProfileImage data-test="profile-image" src={profile.avatarUrl} alt="깃허브 프로필 이미지" />
      <BaseInfo>
        <GithubName>{profile.name}</GithubName>
        <GithubID data-test="github-id">{profile.gitHubId}</GithubID>
        <GithubURLContainer>
          <GithubIcon src={GithubLogo} alt="깃허브 아이콘" />
          <GithubURL href={`https://github.com/${profile.gitHubId}`}>GitHub</GithubURL>
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
  margin: 40px 40px 0px 0px;
  border-radius: 10px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
`;

const ProfileImage = styled.img`
  margin: 40px auto;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.Shadow};
`;

const BaseInfo = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  justify-content: center;
`;

const GithubName = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
`;

const GithubID = styled.p`
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
