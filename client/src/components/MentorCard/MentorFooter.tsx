import React from 'react';
import styled from '@emotion/styled';

interface Props {
  mentorUserId: number;
}

function MentorFooter({ mentorUserId }: Props): JSX.Element {
  return (
    <Container>
      <ApplyButton>멘토링 신청</ApplyButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const ApplyButton = styled.button`
  display: flex;
  padding: 10px;
  margin-left: auto;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;

export default MentorFooter;
