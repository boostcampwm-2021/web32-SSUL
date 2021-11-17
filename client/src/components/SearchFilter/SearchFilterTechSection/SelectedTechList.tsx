import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  createdFilterdQuery,
  popSelectedTechStack,
  returnGroupRecruitFilterState,
} from '@store/slices/groupRecruitFilterSlice';

function SelectedTechList(): JSX.Element {
  const selectedTechStack = useAppSelector(returnGroupRecruitFilterState).selectedTechStack;
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
  box-shadow: 2px 2px 4px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
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
