import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '@hooks';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import SearchIcon from '@assets/icon_search.png';
import { createdFilterdQuery } from '@store/slices/groupRecruitFilterSlice';

const MAX_INPUT_CNT = 10;

interface searchBarProps {
  searchBarInput: string;
  changeInputEvent: ActionCreatorWithPayload<string>;
  inputValue: string;
}

interface StyledProps {
  inputValue: string;
}

function SearchBar({ searchBarInput, changeInputEvent, inputValue }: searchBarProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSearchButtonClick = async () => {
    dispatch(createdFilterdQuery());
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowInputText = e.currentTarget.value;
    if (nowInputText.length === MAX_INPUT_CNT) alert('10글자 이상 입력이 불가능합니다.');
    else dispatch(changeInputEvent(e.currentTarget.value));
  };

  return (
    <Container>
      <InputValue placeholder="Search for.." value={searchBarInput} onChange={handleInputText} />
      <SearchButton inputValue={inputValue} onClick={handleSearchButtonClick}>
        <Image src={SearchIcon} />
      </SearchButton>
    </Container>
  );
}

const Image = styled.img`
  padding: 0px;
  margin: 0px 0px 0px 0px;
`;

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
  border-radius: 30px 30px 30px 30px;
  &:focus {
    outline: 0;
  }
`;

const SearchButton = styled.button`
  display: ${(props: StyledProps) => (props.inputValue === 'GROUP_NAME' ? 'diplay' : 'none')};
  background: ${(props) => props.theme.White};
  border: none;
  cursor: pointer;
`;

export default SearchBar;
