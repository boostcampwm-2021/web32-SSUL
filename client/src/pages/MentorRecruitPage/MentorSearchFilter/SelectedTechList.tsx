import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  createdFilterdQuery,
  popSelectedTechStack,
  returnMentorRecruitFilterState,
} from '@store/mentor/filterSlice';

function SelectedTechList(): JSX.Element {
  const { selectedTechStack } = useAppSelector(returnMentorRecruitFilterState);
  const selectedTechStackDispatch = useAppDispatch();

  const handleEraseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetTechStack = e.currentTarget as HTMLButtonElement;
    const nowTechStack = targetTechStack.previousElementSibling?.innerHTML;
    selectedTechStackDispatch(popSelectedTechStack(nowTechStack));
    selectedTechStackDispatch(createdFilterdQuery());
  };

  const totalSelectedTechList = selectedTechStack.map((techStack, idx) => {
    return (
      <SelectItem key={idx}>
        <TechStackName>{techStack}</TechStackName>
        <EraseButton onClick={handleEraseButtonClick}>X</EraseButton>
      </SelectItem>
    );
  });

  return <Container>{totalSelectedTechList}</Container>;
}

const Container = styled.div`
  display: flex;
  margin: 15px;
`;

const SelectItem = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  border-radius: 10px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
`;

const TechStackName = styled.span`
  align-self: center;
`;

const EraseButton = styled.button`
  margin-left: 10px;
  background: ${(props) => props.theme.Primary};
  border: 10px;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default SelectedTechList;
