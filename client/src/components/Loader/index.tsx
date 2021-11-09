import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import loaderImage from '@assets/image_loader.png';

const Loader = (): JSX.Element => {
  return (
    <Content>
      <Circle src={loaderImage} />
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
  background-color: white;
`;
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Circle = styled.img`
  width: 48px;
  height: 48px;
  animation: ${rotate} 1s ease infinite;
`;

export default Loader;
