import React from 'react';
import styled from '@emotion/styled';

function GroupBoard(): JSX.Element {
  return (
    <Container>
      <MainInfoBox>
        <Type>공지</Type>
        <Title>리액트 공부할 때 도움되는 레퍼런스 모음집</Title>
      </MainInfoBox>
      <SubInfoBox>
        <Writer>김동규</Writer>
        <Date>2021-11-16</Date>
      </SubInfoBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 48px 4px 48px;
  margin-bottom: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  cursor: pointer;
`;
const MainInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Type = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.Red};
  margin-right: 12px;
`;
const Title = styled.span`
  width: fit-content;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.Gray1};
`;
const SubInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;
const Writer = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.Gray2};
`;
const Date = styled.span`
  font-size: 0.625rem;
  font-weight: 500;
  color: ${(props) => props.theme.Gray2};
`;

export default GroupBoard;
