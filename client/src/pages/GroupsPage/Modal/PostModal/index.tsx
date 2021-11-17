import React, { useState } from 'react';
import PostTypeNav from './PostTypeNav';
import styled from '@emotion/styled';
import { useAppDispatch } from '@hooks';
import { changeGroupModalState } from '@store/slices/utilSlice';
import CancelIcon from '@assets/icon_cancel.png';

function PostModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState<string>('NORMAL');
  const handlePostNavItemClick =
    (type: string): (() => void) =>
    () =>
      setSelectedType(type);
  const handleCancelButtonClick = () => dispatch(changeGroupModalState('NONE'));

  return (
    <Container>
      <Header>
        <Title>글쓰기</Title>
        <CancelButton src={CancelIcon} onClick={handleCancelButtonClick} />
      </Header>
      <Content>
        <PostTypeNav selectedType={selectedType} handlePostNavItemClick={handlePostNavItemClick} />
        <TextInput placeholder="내용을 입력하세요." />
      </Content>
      <PostButton>작성</PostButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1.75px solid ${(props) => props.theme.Gray4};
`;

const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.Gray2};
`;
const CancelButton = styled.img`
  position: absolute;
  right: 8px;
  width: 14px;
  height: 14px;
  filter: invert(17%) sepia(7%) saturate(21%) hue-rotate(353deg) brightness(104%) contrast(94%);
  cursor: pointer;
`;

const Content = styled.div`
  padding: 12px;
`;
const TextInput = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 8px;
  border: 1.75px solid ${(props) => props.theme.Gray4};
  border-radius: 18px;
  resize: none;
  box-shadow: inset 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

const PostButton = styled.span`
  position: absolute;
  bottom: 16px;
  right: 36px;
  width: fit-content;
  padding: 6px 12px 6px 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.theme.White};
  border-radius: 12px;
  background-color: ${(props) => props.theme.Primary};
  cursor: pointer;
`;

export default PostModal;
