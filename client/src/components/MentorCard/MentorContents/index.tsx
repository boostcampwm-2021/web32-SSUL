import React from 'react';
import styled from '@emotion/styled';
import MentorStatus from './MentorStatus';
import MentorProfile from './MentorProfile';
import { Mentor } from '@types';

interface Props {
  contents: Mentor;
}

function MentorContents({ contents }: Props): JSX.Element {
  return (
    <Container>
      <MentorProfile user={contents.user} />
      <MentorStatus user={contents.user} techStacks={contents.techStacks} />
    </Container>
  );
}

const Container = styled.div``;

export default MentorContents;
