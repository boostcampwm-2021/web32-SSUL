import React from 'react';
import styled from '@emotion/styled';

interface Props {
  searchText: string;
  handleSearchInput: (changeInput: string) => void;
}

function SearchBar({ searchText, handleSearchInput }: Props): JSX.Element {
  const handleInputText = (e: any) => {
    handleSearchInput(e.currentTarget.value);
  };

  return (
    <Container>
      <InputValue placeholder="Search for.." value={searchText} onChange={handleInputText} />
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
