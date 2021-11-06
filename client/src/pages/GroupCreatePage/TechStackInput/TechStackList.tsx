import styled from '@emotion/styled';
import React from 'react';
import { TechStack } from '../../../types/TechStack';

interface Props {
  techStackList: TechStack[];
}
function TechStackList({ techStackList }: Props): JSX.Element {
  const techStackElements = techStackList.map((techStack, idx) => {
    return <TechListItem key={idx}>{techStack.name}</TechListItem>;
  });

  return <Container>{techStackElements}</Container>;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const TechListItem = styled.button`
  display: flex;
  margin: 10px;
  padding: 10px;

  color: ${(props) => props.theme.Gray3};
  background: ${(props) => props.theme.Gray5};
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
export default TechStackList;
