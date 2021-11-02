import React from 'react';
import styled from '@emotion/styled';

const dummyData = ['공모전', '프로젝트', '대외활동'];

function CategoryList(): JSX.Element {
  return (
    <Container>
      {dummyData.map((category, idx) => {
        return <CategoryListItem key={idx}>{category}</CategoryListItem>;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const CategoryListItem = styled.div`
  display: flex;
  margin: 10px;
`;

export default CategoryList;
