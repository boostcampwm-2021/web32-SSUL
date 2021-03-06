import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '@hooks';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import SearchIcon from '@assets/icon_search.png';
import {
  GROUP_NAME_SEARCH,
  MAX_SEARCH_INPUT_LEN,
  MENTOR_NAME_SEARCH,
  TECH_NAME_SEARCH,
  MSG_SEARCH_BAR_INPUT_LEN_ERROR,
} from '@constants/consts';
import { SearchBarTypeEnum } from '@constants/enums';
import { useToast } from '@hooks';

interface Props {
  searchBarInput: string;
  changeInputEvent: ActionCreatorWithPayload<string>;
  createdFilterdQuery: ActionCreatorWithoutPayload<string>;
  inputValue: string;
}

function SearchBar({
  searchBarInput,
  changeInputEvent,
  inputValue,
  createdFilterdQuery,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [toastify] = useToast();

  const returnPlaceholderText = (type: string) => {
    switch (type) {
      case SearchBarTypeEnum.GROUP_NAME:
        return GROUP_NAME_SEARCH;
      case SearchBarTypeEnum.MENTOR_NAME:
        return MENTOR_NAME_SEARCH;
      case SearchBarTypeEnum.TECH_STACK:
        return TECH_NAME_SEARCH;
    }
  };

  const handleSearchButtonClick = async () => {
    dispatch(createdFilterdQuery());
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowInputText = e.currentTarget.value;
    if (nowInputText.length === MAX_SEARCH_INPUT_LEN)
      toastify(MSG_SEARCH_BAR_INPUT_LEN_ERROR, 'ERROR');
    else dispatch(changeInputEvent(e.currentTarget.value));
  };

  return (
    <Container>
      <InputValue
        placeholder={returnPlaceholderText(inputValue)}
        value={searchBarInput}
        onChange={handleInputText}
      />
      <SearchButton
        data-test="search-btn"
        inputValue={inputValue}
        onClick={handleSearchButtonClick}
      >
        <Image src={SearchIcon} alt="검색 버튼" />
      </SearchButton>
    </Container>
  );
}

const Image = styled.img`
  width: 20px;
  padding: 0px;
  margin: 0px 0px 0px 0px;
`;

const Container = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  width: 200px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
  border-radius: 20px;
`;

const InputValue = styled.input`
  display: flex;
  border: none;
  border-radius: 20px;

  &:focus {
    outline: 0;
  }
`;

interface StyledProps {
  inputValue: string;
}

const SearchButton = styled.button<StyledProps>`
  display: ${(props) => (props.inputValue === SearchBarTypeEnum.TECH_STACK ? 'none' : 'flex')};
  background: ${(props) => props.theme.White};
  border: none;
  cursor: pointer;
`;

export default SearchBar;
