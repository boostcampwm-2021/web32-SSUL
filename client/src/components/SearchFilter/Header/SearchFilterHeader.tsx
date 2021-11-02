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
  margin: 20px;
  padding: 10px;

  background: ${(props) => props.theme.Gray4};
  box-shadow: 20px 20px 40px 4px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

export default SearchFilterHeader;
