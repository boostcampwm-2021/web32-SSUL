import React from 'react';
import styled from '@emotion/styled';
import FeverSharingBar from './FeverSharingBar';

function ProfileHeader(): JSX.Element {
  return (
    <Container>
      <ProfileImage src="https://avatars.githubusercontent.com/u/55623688?v=4"></ProfileImage>
      <CommonInfo>
        <GitHubInfo>ChanYangYu</GitHubInfo>
        <FeverSharingBar></FeverSharingBar>
      </CommonInfo>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 650px;
  margin: 40px auto;
  box-shadow: inset 0px 0px 4px rgb(0 0 0 / 25%);
  border-radius: 10px;
`;

const ProfileImage = styled.img`
  margin: 40px 0px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const CommonInfo = styled.div`
  display: flex;
  width: 300px;
  margin: 40px;
  flex-direction: column;
  justify-content: center;
`;

const GitHubInfo = styled.p`
  margin: 20px 0;
  font-size: 25px;
  font-weight: bold;
`;

export default ProfileHeader;
