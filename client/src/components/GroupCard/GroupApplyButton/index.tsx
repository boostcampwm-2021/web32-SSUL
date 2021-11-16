import React from 'react';
import styled from '@emotion/styled';

interface Props {
  dueDate: number;
}

function GroupApplyButton({ dueDate }: Props): JSX.Element {
  return (
    <Container>
      <Text>{dueDate < 0 ? 'Alreday Start' : `모집 D-${dueDate}`}</Text>
      <ApplyButton>보기</ApplyButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
`;

const Text = styled.h4`
  margin: 10px 0;
  color: ${(props) => props.theme.Gray4};
`;

const ApplyButton = styled.button`
  display: flex;
  padding: 10px;
  margin-left: auto;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  flex-direction: row;
`;

export default GroupApplyButton;
