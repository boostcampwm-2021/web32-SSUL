import React from 'react';
import styled from '@emotion/styled';
import Post from './Post';

function GroupBoard(): JSX.Element {
  const NUM = 12;
  const postList = [...Array(NUM)].map((_, idx) => <Post key={idx} />);
  return (
    <Container>
      {postList.length ? <>{postList}</> : <NoGroupNoti>아직 작성된 글이 없습니다!</NoGroupNoti>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const NoGroupNoti = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.Gray2};
  padding-left: 10px;
  margin: 0px;
`;

export default GroupBoard;
