import React from 'react';
import styled from '@emotion/styled';
import CategoryList from './CategoryList';
import SearchBar from '../SearchBar';

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
  justify-content: space-between;
  width: 80vw;
  min-width: 1000px;
  margin: 20px;
  padding: 10px;

  background: ${(props) => props.theme.Primary};
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export default SearchFilterHeader;
