import React from 'react';
import styled from '@emotion/styled';
import Post from './Post';

function GroupBoard(): JSX.Element {
  return (
    <Container>
      <Post />
    </Container>
  );
}

const Container = styled.div``;

export default GroupBoard;
