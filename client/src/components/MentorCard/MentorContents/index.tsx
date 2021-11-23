import React from 'react';
import styled from '@emotion/styled';
import MentorStatus from './MentorStatus';
import MentorProfile from './MentorProfile';

function MentorContents(): JSX.Element {
  return (
    <Container>
      <MentorProfile />
      <MentorStatus />
    </Container>
  );
}

const Container = styled.div``;

export default MentorContents;
