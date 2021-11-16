import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Loader = (): JSX.Element => {
  return (
    <Content>
      <Spinner></Spinner>
      <LoadingText>Loading...</LoadingText>
    </Content>
  );
};

const Content = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
`;
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: absolute;
  width: 12vh;
  height: 12vh;
  top: 45vh;
  margin: auto;
  border-radius: 50%;
  border: 1vh solid transparent;
  border-top-color: ${(props) => props.theme.Primary};
  border-bottom-color: ${(props) => props.theme.Primary};
  animation: ${rotate} 0.8s ease infinite;
`;
const LoadingText = styled.p`
  position: absolute;
  width: 100%;
  top: 60vh;
  margin-left: 10px;
  text-align: center;
  font-size: 3vh;
  color: ${(props) => props.theme.Primary};
`;

export default Loader;
