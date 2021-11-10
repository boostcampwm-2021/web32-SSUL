import React from 'react';
import styled from '@emotion/styled';
import FeverSharingBar from './FeverSharingBar';
import GithubLogo from '@assets/icon_github_logo.png';

function ProfileSideContents(): JSX.Element {
  return (
    <Container>
      <ProfileImage
        src="https://avatars.githubusercontent.com/u/55623688?v=4"
        alt="GithubProfifleImage"
      ></ProfileImage>
      <BaseInfo>
        <NickName>GOODTSS</NickName>
        <GithubName>ChanYangYu</GithubName>
        <FeverSharingBar />
        <GithubURLContainer>
          <GithubIcon src={GithubLogo} alt="GithubIcon"></GithubIcon>
          <GithubURL href="https://github.com/ChanYangYu">GitHub Storage</GithubURL>
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
  margin-left: 50px;
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
