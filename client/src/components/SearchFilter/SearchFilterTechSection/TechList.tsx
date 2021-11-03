import React from 'react';
import styled from '@emotion/styled';

interface Props {
  listView: string[];
}

function TechList({ listView }: Props): JSX.Element {
  const techList = listView.map((category, idx) => {
    return <TechListItem key={idx}>{category}</TechListItem>;
  });

  return <Container>{techList}</Container>;
}

const Container = styled.div`
  display: grid;
  margin: 10px;

  grid-template-columns: repeat(7, minmax(100px, 2fr));
  grid-template-rows: repeat(auo-fit, minmax(100px, 2fr));

  background: ${(props) => props.theme.White};
  box-shadow: 0px 0px 30px -5px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

const TechListItem = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;

  color: ${(props) => props.theme.Gray3};
  background: ${(props) => props.theme.Gray5};
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

export default TechList;
