import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

function FeverSharingBar(): JSX.Element {
  return (
    <Container>
      <FeverIndex />
      <SharingIndex />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  max-width: 600px;
`;

const ProgressAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 150px;
  }
`;

const FeverIndex = styled.div`
  width: 150px;
  height: 20px;
  background-color: #ee7262;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  animation: ${ProgressAnimation} 0.5s linear .1s normal none 1;
`;


const SharingIndex = styled.div`
  width: 150px;
  height: 20px;
  background-color: #9cde84;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  animation: ${ProgressAnimation} 0.5s linear .1s normal none 1;
`;


export default FeverSharingBar;
