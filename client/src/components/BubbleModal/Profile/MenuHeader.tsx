import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useAppSelector } from '@hooks';
import { selectUser } from '@store/user/globalSlice';
import { getStackGage } from '@utils/Range';

function MenuHeader(): JSX.Element {
  const { name, feverStack, shareStack } = useAppSelector(selectUser);
  const handler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Container onClick={handler}>
      <Introduction>
        <IntroText>안녕하세요,</IntroText>
        <NameText>{name}</NameText>
        <IntroText>님</IntroText>
      </Introduction>
      <ScoreGraph>
        <RightBar>
          <PassionGraph range={getStackGage(feverStack)}>열정</PassionGraph>
        </RightBar>
        <LeftBar>
          <ShareGraph range={getStackGage(shareStack)}>나눔</ShareGraph>
        </LeftBar>
      </ScoreGraph>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 200px;
  height: 80px;
  padding: 0px 24px 0px 24px;
  border: 1px soild ${(props) => props.theme.Gray5};
  font-size: 0.9em;
  box-sizing: border-box;
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: end;
  width: 200px;
  height: 50px;
  padding: 0px 24px 0px 24px;
  font-size: 0.9em;
  box-sizing: border-box;
`;

const IntroText = styled.span`
  color: ${(props) => props.theme.Gray1};
  font-weight: 500;
  margin-right: 4px;
`;

const NameText = styled.span`
  color: ${(props) => props.theme.Gray1};
  font-weight: 700;
  margin-right: 2px;
`;

const fillFrame = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -10px, 0);
  }

  70% {
    transform: translate3d(0, -5px, 0);
  }

  90% {
    transform: translate3d(0,-1px,0);
  }
`;

const ScoreGraph = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 80px;
  font-size: 0.5em;
  padding: 0px 4px 0px 4px;
  color: ${(props) => props.theme.White};
  box-sizing: border-box;
  animation: ${fillFrame} 1s ease infinite;
`;

const RightBar = styled.div`
  display: flex;
  justify-content: end;
  width: 100px;
`;

const LeftBar = styled.div`
  width: 100px;
`;

const Graph = styled.div`
  height: 20px;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.Shadow};
`;

const PassionGraph = styled(Graph)<{ range: number }>`
  width: ${(props) => props.range}px;
  text-align: right;
  padding: 4px 8px 4px 4px;
  background-color: #ee7262;
  border-radius: 24px 0px 0px 24px;
`;

const ShareGraph = styled(Graph)<{ range: number }>`
  width: ${(props) => props.range}px;
  text-align: left;
  padding: 4px 4px 4px 8px;
  background-color: #9cde84;
  border-radius: 0px 24px 24px 0px;
`;

export default MenuHeader;
