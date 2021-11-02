import React from 'react';
import styled from '@emotion/styled';

const dummyData = [
  '공모전',
  '프로젝트',
  '대외활동',
  '스터디',
  '동아리',
  '면접/인터뷰',
  '토이프로젝트',
  '구인/구직',
  '기타',
];

function CategoryList(): JSX.Element {
  const categoryItems = dummyData.map((category, idx) => {
    if (idx === 4) return <CategoryItemSelect key={category}>{category}</CategoryItemSelect>;
    else return <CategoryItem key={idx}>{category}</CategoryItem>;
  });

  return <Container>{categoryItems}</Container>;
}

const Container = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
`;

const CategoryItem = styled.div`
  display: flex;
  margin: 5px;
  padding: 10px;

  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Gray5};
  box-shadow: 10px 10px 10px -5px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

const CategoryItemSelect = styled.div`
  display: flex;
  margin: 5px;
  padding: 10px;

  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 10px 10px 10px -5px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

export default CategoryList;
