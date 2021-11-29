import React from 'react';
import styled from '@emotion/styled';
import { SearchBar } from '@components';
import SelectedTechList from './SelectedTechList';
import { useAppSelector } from '@hooks';
import {
  returnMentorRecruitFilterState,
  changeTechStackInput,
  createdFilterdQuery,
} from '@store/mentor/filterSlice';

function TechSectionHeader(): JSX.Element {
  const { techStackInput } = useAppSelector(returnMentorRecruitFilterState);

  return (
    <Container>
      <SearchBar
        searchBarInput={techStackInput}
        changeInputEvent={changeTechStackInput}
        createdFilterdQuery={createdFilterdQuery}
        inputValue={'TECH_STACK'}
      />
      <SelectedTechList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;

  border-radius: 20px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
`;

export default TechSectionHeader;
