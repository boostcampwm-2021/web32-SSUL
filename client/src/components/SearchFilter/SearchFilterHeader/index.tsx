import React from 'react';
import styled from '@emotion/styled';
import CategoryList from './CategoryList';
import { useAppSelector } from '@hooks';
import {
  returnGroupRecruitFilterState,
  changeGroupNameInput,
  createdFilterdQuery,
} from '@store/group/filterSlice';
import { SearchBar } from '@components';

function SearchFilterHeader(): JSX.Element {
  const { groupNameInput } = useAppSelector(returnGroupRecruitFilterState);
  return (
    <Container>
      <CategoryList />
      <SearchBar
        searchBarInput={groupNameInput}
        changeInputEvent={changeGroupNameInput}
        createdFilterdQuery={createdFilterdQuery}
        inputValue={'GROUP_NAME'}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 20px;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.25);

  border-radius: 10px;
`;

export default SearchFilterHeader;
