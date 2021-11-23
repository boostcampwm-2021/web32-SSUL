import React from 'react';
import styled from '@emotion/styled';
import { CategoryData } from '@types';

interface Props {
  category: CategoryData;
}

function GroupDetailTitle({ category }: Props): JSX.Element {
  return (
    <Container>
      <h2>그룹 소개</h2>
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
