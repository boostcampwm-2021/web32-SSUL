import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
const MAX_INPUT_CNT = 10;

interface searchBarProps {
  searchBarInput: string;
  changeInputEvent: ActionCreatorWithPayload<string>;
}

function SearchBar({ searchBarInput, changeInputEvent }: searchBarProps): JSX.Element {
  const dispatch = useDispatch();

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowInputText = e.currentTarget.value;
    if (nowInputText.length === MAX_INPUT_CNT) alert('10글자 이상 입력이 불가능합니다.');
    else dispatch(changeInputEvent(e.currentTarget.value));
  };

  return (
    <Container>
      <InputValue placeholder="Search for.." value={searchBarInput} onChange={handleInputText} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 30px 30px;
`;

const InputValue = styled.input`
  display: flex;
  border: none;
`;

export default SearchBar;
