import React from 'react';
import styled from '@emotion/styled';
import CategoryItem from './CategoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { GroupData } from '../../../types/CreateGroup';
import { setGroupData } from '../../../store/slices/createGroupInfo';

const categoryList: string[] = [
  '대외활동',
  '공모전',
  '스터디',
  '동아리',
  '면접/인터뷰',
  '토이프로젝트',
  '구인/구직',
  '기타',
];

function Category(): JSX.Element {
  const { category } = useSelector<ReducerType, GroupData>((state) => state.createGroupInfo);
  const dispatch = useDispatch();

  const getList = () => {
    return categoryList.map((categoryName, idx) => (
      <CategoryItem
        key={idx}
        category={categoryName}
        clicked={categoryName === category}
        handleCategoryClick={() => dispatch(setGroupData({ category: categoryName }))}
      />
    ));
  };
  return (
    <>
      <Title>카테고리를 선택해주세요.</Title>
      <CategoryWrapper>{getList()}</CategoryWrapper>
    </>
  );
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
