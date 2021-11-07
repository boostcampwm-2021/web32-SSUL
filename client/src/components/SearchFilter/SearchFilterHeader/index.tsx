import React from 'react';
import styled from '@emotion/styled';
import CategoryList from './CategoryList';
import SearchBar from '../SearchBar';
import { ReducerType } from '@store/rootReducer';
import { useSelector } from 'react-redux';
import {
  groupRecruitType,
  returnGroupRecruitFilterState,
  changeGroupNameInput,
} from '../../../store/slices/groupRecruitFilterSlice';

function SearchFilterHeader(): JSX.Element {
  const groupNameInput = useSelector<ReducerType, groupRecruitType>(
    returnGroupRecruitFilterState,
  ).groupNameInput;
  return (
    <Container>
      <CategoryList />
      <SearchBar searchBarInput={groupNameInput} changeInputEvent={changeGroupNameInput} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw;
  min-width: 1000px;
  margin: 20px;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.25);

  border-radius: 10px;
`;

export default SearchFilterHeader;
