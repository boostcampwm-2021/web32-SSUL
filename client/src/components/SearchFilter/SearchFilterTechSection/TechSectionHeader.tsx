import React from 'react';
import styled from '@emotion/styled';
import SearchBar from '../SearchBar';
import SelectedTechList from './SelectedTechList';
import { useAppSelector } from '@hooks';
import {
  groupRecruitType,
  returnGroupRecruitFilterState,
  changeTechStackInput,
} from '@store/slices/groupRecruitFilterSlice';

function TechSectionHeader(): JSX.Element {
  const techStackInput = useAppSelector<groupRecruitType>(
    returnGroupRecruitFilterState,
  ).techStackInput;

  return (
    <Container>
      <SearchBar searchBarInput={techStackInput} changeInputEvent={changeTechStackInput} />
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
