import React from 'react';
import styled from '@emotion/styled';
import SearchBar from '../SearchBar';
import SelectedTechList from './SelectedTechList';

interface Props {
  searchInput: string;
  handleSearchInput: (input: string) => void;
}

function TechSectionHeader({ searchInput, handleSearchInput }: Props): JSX.Element {
  return (
    <Container>
      <SearchBar searchText={searchInput} handleSearchInput={handleSearchInput} />
      <SelectedTechList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: 5px 5px 20px -5px rgba(41, 36, 36, 0.25);
  border-radius: 40px;
`;

export default TechSectionHeader;
