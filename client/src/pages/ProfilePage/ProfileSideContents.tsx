import React from 'react';
import styled from '@emotion/styled';
import FeverSharingBar from './FeverSharingBar';
import GithubLogo from '@assets/icon_github_logo.png';
import { useAppSelector } from '@hooks';
import { selectUser } from '@store/slices/userSlice';

function ProfileSideContents(): JSX.Element {
  const user = useAppSelector(selectUser);

  return (
    <Container>
      <ProfileImage src={user.image} alt="GithubProfifleImage" />
      <BaseInfo>
        <NickName>{user.name}</NickName>
        <GithubName>{user.oAuthId}</GithubName>
        <FeverSharingBar />
        <GithubURLContainer>
          <GithubIcon src={GithubLogo} alt="GithubIcon"></GithubIcon>
          <GithubURL href={`https://github.com/${user.oAuthId}`}>GitHub Storage</GithubURL>
        </GithubURLContainer>
      </BaseInfo>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  margin: 40px 70px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

const BaseInfo = styled.div`
  display: flex;
  width: 300px;
  margin: 0 20px;
  flex-direction: column;
  justify-content: center;
`;

const NickName = styled.p`
  margin: 0 0 10px 50px;
  font-size: 26px;
  font-weight: bold;
`;

const GithubName = styled.p`
  margin: 0 0 20px 50px;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
`;

const GithubURLContainer = styled.div`
  display: flex;
  margin: 20px 0 0 50px;
`;

const GithubURL = styled.a`
  text-decoration: none;
  margin-left: 10px;
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
