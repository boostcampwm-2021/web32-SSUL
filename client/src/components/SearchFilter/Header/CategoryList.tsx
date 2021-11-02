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
  width: 80%;
  align-items: center;
`;

const CategoryListItem = styled.div`
  display: flex;
  margin: 5px;
  padding: 10px;

  background: ${(props) => props.theme.Gray4};
  box-shadow: 20px 20px 40px 4px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

export default CategoryList;
