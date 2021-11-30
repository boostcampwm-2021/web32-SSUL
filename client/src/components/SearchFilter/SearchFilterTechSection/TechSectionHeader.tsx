import React from 'react';
import styled from '@emotion/styled';
import SelectedTechList from './SelectedTechList';
import { useAppSelector } from '@hooks';
import {
  returnGroupRecruitFilterState,
  changeTechStackInput,
  createdFilterdQuery,
} from '@store/group/filterSlice';
import { SearchBar } from '@components';
import { SearchBarTypeEnum } from '@constants/enums';

function TechSectionHeader(): JSX.Element {
  const { techStackInput } = useAppSelector(returnGroupRecruitFilterState);

  return (
    <Container>
      <SearchBar
        searchBarInput={techStackInput}
        changeInputEvent={changeTechStackInput}
        createdFilterdQuery={createdFilterdQuery}
        inputValue={SearchBarTypeEnum.TECH_STACK}
      />
      <SelectedTechList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;

  border: 1px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
  border-radius: 20px;
`;

export default TechSectionHeader;
