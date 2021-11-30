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
  border-radius: 24px;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
`;

export default GroupBoard;
