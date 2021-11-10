import React from 'react';
import styled from '@emotion/styled';
import ProfileSideContents from './ProfileSideContents';
import ProfileUserContents from './ProfileUserContents';
import ProfileMentorContents from './ProfileMentorContents';

function ProfilePage(): JSX.Element {
  return (
    <Container>
      <ProfileSideContents />
      <ContentsContainer>
        <ProfileUserContents />
        <ProfileMentorContents />
      </ContentsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default ProfilePage;
