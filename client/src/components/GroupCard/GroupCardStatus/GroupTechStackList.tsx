import React from 'react';
import styled from '@emotion/styled';

interface Props {
  techStackList: string[];
}

function GroupTechStackList({ techStackList }: Props): JSX.Element {
  const renderTechStackList = techStackList.map((techStack, idx) => {
    return <TechListItem key={idx}>{techStack} </TechListItem>;
  });
  return <TechList>{renderTechStackList}</TechList>;
}

const TechList = styled.div`
  display: flex;
  margin: 10px;
`;

const TechListItem = styled.button`
  display: flex;
  margin: 5px;
  padding: 10px;

  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
  border: none;
`;
export default GroupTechStackList;
