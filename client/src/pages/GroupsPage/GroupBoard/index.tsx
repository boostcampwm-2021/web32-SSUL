import React from 'react';
import styled from '@emotion/styled';
import GroupBoardHeader from './GroupBoardHeader';
import PostList from './PostList';

function GroupBoard(): JSX.Element {
  return (
    <Container>
      <GroupBoardHeader />
      <PostList />
    </Container>
  );
}

const Container = styled.div`
  width: 1080px;
  min-height: 360px;
  padding: 20px 24px 20px 24px;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

export default GroupBoard;
