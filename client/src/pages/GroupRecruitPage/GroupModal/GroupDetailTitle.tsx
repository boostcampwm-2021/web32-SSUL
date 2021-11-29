import React from 'react';
import styled from '@emotion/styled';
import { CategoryData } from '@types';
import { GROUP_INTRO_TITLE } from '@constants/consts';

interface Props {
  category: CategoryData;
}

function GroupDetailTitle({ category }: Props): JSX.Element {
  return (
    <Container>
      <h2>{GROUP_INTRO_TITLE}</h2>
      <CategoryName>{category.name}</CategoryName>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoryName = styled.h2`
  align-self: center;
  color: ${(props) => props.theme.Gray3};
`;

export default GroupDetailTitle;
