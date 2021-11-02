import React from 'react';
import styled from '@emotion/styled';
import TechSectionHeader from './TechSectionHeader';
import TechList from './TechList';

function SearchFilterTechSection(): JSX.Element {
  return (
    <Container>
      <TechSectionHeader />
      <TechList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  padding: 10px;

  background: ${(props) => props.theme.Gray4};
  box-shadow: 20px 20px 40px 4px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

export default SearchFilterTechSection;
