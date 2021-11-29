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

  background: ${(props) => props.theme.White};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
`;

export default TechSectionHeader;
