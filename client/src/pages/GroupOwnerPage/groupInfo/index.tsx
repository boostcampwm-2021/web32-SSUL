import React from 'react';
import styled from '@emotion/styled';
import GroupTitle from './GroupTitle';
import GroupDate from './GroupDate';
import GroupIntro from './GroupIntro';

function GroupInfoBox(): JSX.Element {
  return (
    <Container>
      <Title>⛏ 그룹 정보</Title>
      <EditBoxContainer style={{ minHeight: '100px' }}>
        <GroupTitle />
      </EditBoxContainer>

      <EditBoxContainer style={{ minHeight: '100px' }}>
        <GroupDate />
      </EditBoxContainer>

      <EditBoxContainer style={{ minHeight: '200px' }}>
        <GroupIntro/>
      </EditBoxContainer>
    </Container>
  );
}

const Container = styled.div`
  min-width: 600px;
  height: 550px;
  overflow-y: scroll;
  border: 1px ${(props) => props.theme.Gray5} solid;
  border-radius: 5px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.p`
  margin: 10px 0 20px 20px;
  font-size: 17px;
  font-weight: bold;
`;
const EditBoxContainer = styled.div`
  position: relative;
  width: 560px;
  min-height: ${(props) => props?.style?.minHeight};
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;

export default GroupInfoBox;
