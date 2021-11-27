import React from 'react';
import styled from '@emotion/styled';
import GroupList from './GroupList';

function MentorModal(): JSX.Element {
  return (
    <Container>
      <h2>내 그룹 목록</h2>
      <GroupList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export default MentorModal;
