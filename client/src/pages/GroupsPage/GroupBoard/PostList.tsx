import React from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import { useAppSelector } from '@hooks';
import { selectAllPosts } from '@store/group/postSlice';
import { POST_EMPTY_TEXT } from '@constants/consts';

function PostList(): JSX.Element {
  const posts = useAppSelector(selectAllPosts);
  const postList = posts.map((post) => <Post post={post} key={post.id} />);

  return (
    <Container>
      {postList.length ? <>{postList}</> : <NoGroupNoti>{POST_EMPTY_TEXT}</NoGroupNoti>}
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

export default PostList;
