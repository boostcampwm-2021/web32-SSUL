import React from 'react';
import styled from '@emotion/styled';
import CategoryList from './CategoryList';
import SearchBar from './SearchBar';

function SearchFilterHeader(): JSX.Element {
  return (
    <Container>
      <CategoryList />
      <SearchBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 20px;
`;

export default SearchFilterHeader;
