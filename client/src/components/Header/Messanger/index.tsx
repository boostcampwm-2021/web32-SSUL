import React from 'react';
import styled from '@emotion/styled';
import ChatIcon from '../../../assets/icon_chat.svg';

function Messanger(): JSX.Element {
  return (
    <Container>
      <ChatButton src={ChatIcon} />
    </Container>
  );
}

const Container = styled.div`
  margin: 0px 24px 0px 12px;
  cursor: pointer;
`;

const ChatButton = styled.img`
  width: 19px;
`;

export default Messanger;
