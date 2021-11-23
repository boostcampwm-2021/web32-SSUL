import React from 'react';
import styled from '@emotion/styled';
import AntDatePicker from '@pages/GroupCreatePage/DateInput/AntDatePicker';

function GroupDate(): JSX.Element {
  return (
    <Container>
      <Header>
        <BoxTitle>시작/종료일</BoxTitle>
        <EditButton>편집</EditButton>
      </Header>
      <DatePickerContainer>
          <AntDatePicker></AntDatePicker>
        </DatePickerContainer>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
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

export default GroupDate;
