import React from 'react';
import styled from '@emotion/styled';
import AntDatePicker from '@pages/GroupCreatePage/DateInput/AntDatePicker';

function GroupInfoEditBox(): JSX.Element {
  return (
    <Container>
      <Title>⛏ 그룹 정보</Title>
      <EditBoxContainer style={{ minHeight: '100px' }}>
        <BoxHeader>
          <BoxTitle>제목</BoxTitle>
          <EditButton>편집</EditButton>
        </BoxHeader>
      </EditBoxContainer>

      <EditBoxContainer style={{ minHeight: '100px' }}>
      <BoxHeader>
        <BoxTitle>시작/종료일</BoxTitle>
        <EditButton>편집</EditButton>
      </BoxHeader>
        <DatePickerContainer>
          <AntDatePicker></AntDatePicker>
        </DatePickerContainer>
      </EditBoxContainer>

      <EditBoxContainer style={{ minHeight: '200px' }}>
        <BoxHeader>
          <BoxTitle>소개</BoxTitle>
          <EditButton>편집</EditButton>
        </BoxHeader>
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

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px auto;
`;

const BoxTitle = styled.p`
  padding: 0;
  margin: 0 0 15px 10px;
  font-size: 16px;
  font-weight: bold;
`;

const EditButton = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  margin: 0 5px 15px 0;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
  box-shadow: 0px 3px 5px #8f8f8f, -5px -5px 10px #ffffff;
  &:active {
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
  }
`;

const DatePickerContainer = styled.div`
  width: 530px;
  margin: auto;
`;
export default GroupInfoEditBox;
