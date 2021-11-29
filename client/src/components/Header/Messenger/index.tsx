import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import ChatIcon from '@assets/icon_chat.svg';

function Messenger(): JSX.Element {
  return (
    <Container to="/chat/list">
      <ChatButton src={ChatIcon} alt="채팅 아이콘" />
    </Container>
  );
}

const Container = styled(Link)`
  margin: 0px 24px 0px 12px;
  cursor: pointer;
`;

const ChatButton = styled.img`
  width: 19px;
`;

export default Messenger;
