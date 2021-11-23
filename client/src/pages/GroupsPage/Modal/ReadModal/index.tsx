import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';
import { selectChoosenPost } from '@store/group/postSlice';
import { formatDateToString } from '@utils/Date';
import CancelIcon from '@assets/icon_cancel.png';

function ReadModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectChoosenPost);
  const handleCancelButtonClick = () => dispatch(changeGroupModalState('NONE'));

  if (!post) return <></>;
  return (
    <Container>
      <Header>
        <Title>{post.title}</Title>
        <CancelButton src={CancelIcon} onClick={handleCancelButtonClick} />
      </Header>
      <SubInfoBar>
        <Name>{post.writer}</Name>
        <Date>{formatDateToString(post.createdAt)}</Date>
      </SubInfoBar>
      <Content>{post.content.replaceAll('\r\n', '<br/>')}</Content>
      <Hit>조회수 {post.hit}</Hit>
      <ButtonBox>
        <ModifyButton>수정</ModifyButton>
        <DeleteButton>삭제</DeleteButton>
      </ButtonBox>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1.75px solid ${(props) => props.theme.Gray4};
  margin-bottom: 12px;
`;

const Title = styled.span`
  width: 85%;
  height: 30px;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.Gray2};
  overflow: hidden;
`;

const CancelButton = styled.img`
  position: absolute;
  right: 8px;
  width: 14px;
  height: 14px;
  filter: invert(17%) sepia(7%) saturate(21%) hue-rotate(353deg) brightness(104%) contrast(94%);
  cursor: pointer;
`;

const SubInfoBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin-bottom: 20px;
`;

const Hit = styled.span`
  position: absolute;
  bottom: 10%;
  left: 7%;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.Gray4};
`;

const Name = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.Gray2};
`;

const Date = styled.span`
  font-size: 0.6rem;
  font-weight: 500;
  color: ${(props) => props.theme.Gray3};
`;

const Content = styled.div`
  height: 300px;
  padding: 12px;
  border: 1.75px solid ${(props) => props.theme.Gray2};
  border-radius: 18px;
  overflow: scroll;
  box-shadow: inset 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  margin-bottom: 24px;
  white-space: pre;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const ModifyButton = styled.span`
  width: fit-content;
  padding: 6px 12px 6px 12px;
  margin-right: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.theme.White};
  border-radius: 12px;
  background-color: ${(props) => props.theme.Primary};
  cursor: pointer;
`;

const DeleteButton = styled.span`
  width: fit-content;
  padding: 6px 12px 6px 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.theme.White};
  border-radius: 12px;
  background-color: ${(props) => props.theme.Primary};
  cursor: pointer;
`;

export default ReadModal;
