import React from 'react';
import styled from '@emotion/styled';

interface Style {
  width?: string;
  height?: string;
  padding?: string;
  background?: string;
}

interface Props {
  style?: Style;
  element?: JSX.Element;
  onCancel: () => void;
}

function BoxModal({ style, element, onCancel }: Props): JSX.Element {
  return (
    <Container>
      <Background onClick={onCancel} />
      <Modal style={style}>{element}</Modal>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const Background = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background: rgba(47, 47, 47, 0.65);
  z-index: 9999;
`;

const Modal = styled.div`
  position: fixed;
  top: calc(50vh - ${(props) => props?.style?.height ?? '600px'} / 2);
  width: ${(props) => props?.style?.width ?? '480px'};
  height: ${(props) => props?.style?.height ?? '600px'};
  background: ${(props) => props?.style?.background ?? 'white'};
  border-radius: 28px;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  padding: ${(props) => props?.style?.padding ?? '24px'};
  box-sizing: border-box;
  z-index: 9999;
`;

export default BoxModal;
