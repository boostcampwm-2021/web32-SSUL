import React from 'react';
import styled from '@emotion/styled';
import SearchBar from '../SearchBar';
import SelectedTechList from './SelectedTechList';

function TechSectionHeader(): JSX.Element {
  return (
    <Container>
      <SearchBar />
      <SelectedTechList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;

  background: ${(props) => props.theme.Gray4};
  box-shadow: 20px 20px 40px 4px rgba(41, 36, 36, 0.25);
  border-radius: 40px;
`;

export default TechSectionHeader;
