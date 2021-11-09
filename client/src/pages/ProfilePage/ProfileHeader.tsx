import React from 'react';
import styled from '@emotion/styled';
import FeverSharingBar from './FeverSharingBar';

function ProfileHeader(): JSX.Element {
  return (
    <Container>
      <ProfileImage src="https://avatars.githubusercontent.com/u/55623688?v=4"></ProfileImage>
      <CommonInfo>
        <GitHubInfo>깃허브 ID</GitHubInfo>
        <FeverSharingBar></FeverSharingBar>
        <GitHubInfo>깃허브 URL</GitHubInfo>
      </CommonInfo>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  max-width: 650px;
  margin: auto;
`;

const ProfileImage = styled.img`
  margin-top: 40px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const CommonInfo = styled.div`
  display: flex;
  margin: 40px;
  flex-direction: column;
  justify-content: center;
`;

const GitHubInfo = styled.p`
  margin: 20px 0;
  font-weight: bold;
`;

export default ProfileHeader;
