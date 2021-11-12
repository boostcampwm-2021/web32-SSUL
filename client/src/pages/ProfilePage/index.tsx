import React from 'react';
import styled from '@emotion/styled';
import ProfileSideContents from './ProfileSideContents';
import { ProfileActivityListBox, ProfileIntroBox, ProfileTechStackBox } from './profileBox';
import ProfileMentorStackBox from './profileBox/ProfileMentorStackBox';

function ProfilePage(): JSX.Element {
  return (
    <Container>
      <ProfileSideContents />
      <MainContents>
        <ProfileIntroBox />
        <ProfileTechStackBox />
        <ProfileActivityListBox />
        <Divider />
        <ProfileMentorStackBox/>
      </MainContents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  margin-top: 40px;
  height: 1px;
  background-color: ${(props) => props.theme.Gray5};
`;
export default ProfilePage;
