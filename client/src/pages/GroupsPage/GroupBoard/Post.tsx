import React, { MouseEvent } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';
import { selectPost } from '@store/group/postSlice';
import { postHttpClient } from '@api';
import { Post as PostType } from '@types';
import { getPostTypeString } from '@utils/Post';
import { formatDateToString } from '@utils/Date';
import { ModalTypeEnum } from '@constants/enums';
import { HIT } from '@constants/consts';
import { PostTypeEnum } from '@constants/enums';

interface Props {
  post: PostType;
}

function Post({ post }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const handlePostItemClick = ({ currentTarget }: MouseEvent<EventTarget & HTMLDivElement>) => {
    const postId = Number(currentTarget.id);
    dispatch(selectPost(postId));
    dispatch(changeGroupModalState(ModalTypeEnum.READ));
    postHttpClient.increasePostHit(postId);
  };

  return (
    <Container id={String(post.id)} onClick={handlePostItemClick}>
      <MainInfoBox>
        <MainSubInfoBox>
          <Type type={post.type}>{getPostTypeString(post.type)}</Type>
          <Hit>
            {HIT} {post.hit}
          </Hit>
        </MainSubInfoBox>
        <Title>{post.title}</Title>
      </MainInfoBox>
      <SubInfoBox>
        <Writer>{post.writer}</Writer>
        <Date>{formatDateToString(post.createdAt)}</Date>
      </SubInfoBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 48px 10px 48px;
  margin-bottom: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  cursor: pointer;
`;
const MainInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const MainSubInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
type TypeProps = {
  type: string;
};
const Type = styled.span<TypeProps>`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${(props) => (props.type === PostTypeEnum.NORMAL ? props.theme.Green : props.theme.Red)};
  margin-right: 12px;
`;
const Title = styled.span`
  width: fit-content;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.Gray1};
`;
const SubInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;
const Writer = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.Gray2};
`;
const Date = styled.span`
  font-size: 0.625rem;
  font-weight: 500;
  color: ${(props) => props.theme.Gray2};
`;
const Hit = styled.span`
  font-size: 0.025rem;
  font-weight: 400;
  color: ${(props) => props.theme.Gray4};
`;

export default Post;
