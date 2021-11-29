import React from 'react';
import styled from '@emotion/styled';
import MentorContents from './MentorContents';
import MentorFooter from './MentorFooter';
import { Mentor } from '@types';

interface Props {
  contents: Mentor;
}

function MentorCard({ contents }: Props): JSX.Element {
  return (
    <Card>
      <MentorContents {...{ contents }} />
      <MentorFooter mentorId={contents.id} />
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
`;

export default MentorCard;
