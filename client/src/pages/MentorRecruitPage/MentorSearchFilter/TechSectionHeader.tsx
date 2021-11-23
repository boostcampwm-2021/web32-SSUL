import React from 'react';
import styled from '@emotion/styled';
import { SearchBar } from '@components';
import SelectedTechList from './SelectedTechList';
import { useAppSelector } from '@hooks';
import { returnMentorRecruitFilterState, changeTechStackInput } from '@store/mentor/filterSlice';

function TechSectionHeader(): JSX.Element {
  const techStackInput = useAppSelector(returnMentorRecruitFilterState).techStackInput;

  return (
    <Container>
      <SearchBar
        searchBarInput={techStackInput}
        changeInputEvent={changeTechStackInput}
        inputValue={'TECH_STACK'}
      />
      <SelectedTechList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
`;

export default TechSectionHeader;
