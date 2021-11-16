import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { selectUser } from '@store/slices/userSlice';
import { useAppSelector } from '@hooks';

const DEFAULT_INDEX = 30;
function FeverSharingBar(): JSX.Element {
  const { feverStack, shareStack } = useAppSelector(selectUser);
  const feverIndex = feverStack !== undefined ? feverStack + DEFAULT_INDEX : DEFAULT_INDEX;
  const shareIndex = shareStack !== undefined ? shareStack + DEFAULT_INDEX : DEFAULT_INDEX;
  return (
    <Container>
      <FeverNumber>{feverStack}</FeverNumber>
      <FeverIndex style={{ width: `${feverIndex}px` }} />
      <SharingIndex style={{ width: `${shareIndex}px` }} />
      <ShareNumber>{shareStack}</ShareNumber>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ProgressAnimation = (width: string | number | undefined) => keyframes`
  from { width: 0; }
  to { width: ${width}; }
`;

const Index = styled.div`
  height: 20px;
  width: ${(props) => props.style?.width};
  animation: ${(props) => ProgressAnimation(props.style?.width)} 0.5s linear 0.1s normal none 1;
`;

const FeverIndex = styled(Index)`
  background-color: #ee7262;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const SharingIndex = styled(Index)`
  background-color: #9cde84;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const FeverNumber = styled.p`
  font-weight: bold;
  color: #ee7262;
  margin-right: 10px;
`;

const ShareNumber = styled.p`
  font-weight: bold;
  color: #9cde84;
  margin-left: 10px;
`;
export default FeverSharingBar;
