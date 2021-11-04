import React, {useState} from 'react';
import styled from '@emotion/styled'
import CategoryItem from './CategoryItem';

const categoryList: string[] = [
  '대외활동',
  '공모전',
  '스터디',
  '동아리',
  '면접/인터뷰',
  '토이프로젝트',
  '구인/구직',
  '기타'
];

function Category(): JSX.Element {
  const [selection, setSelection] = useState<string>('');
  const getList = () => {
    return categoryList.map((category,idx) => (
      <CategoryItem
        key={idx}
        category={category}
        clicked={category === selection}
        handleCategoryClick={() => { setSelection(category)} }
      />)
    )
  }
  return(
    <>
      <Title>카테고리를 선택해주세요.</Title>
      <CategoryWrapper>
        {getList()}
      </CategoryWrapper>
    </>
  )
}

const Title = styled.p`
  margin: 30px;
`;
const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin: 0 80px;
`;

export default Category;
