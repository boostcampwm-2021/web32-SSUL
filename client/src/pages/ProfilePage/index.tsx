import React from 'react';
import styled from '@emotion/styled';
import ProfileHeader from './ProfileHeader';
import ProfileUserContents from './ProfileUserContents';
import ProfileMentorContents from './ProfileMentorContents';

function ProfilePage(): JSX.Element {
  return (
    <Container>
      <ProfileHeader />
      <ProfileUserContents />
      <ProfileMentorContents />
    </Container>
  );
}
const Container = styled.div``;

export default ProfilePage;
