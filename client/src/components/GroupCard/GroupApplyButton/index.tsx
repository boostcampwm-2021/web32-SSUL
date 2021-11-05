import React from 'react';
import styled from '@emotion/styled';

function GroupApplyButton(): JSX.Element {
  return <ApplyButton>보기</ApplyButton>;
}

const ApplyButton = styled.button`
  display: flex;
  padding: 10px;
  margin-left: auto;
  outline: none;
  border: none;
  cursor: pointer;
`;

export default GroupApplyButton;
