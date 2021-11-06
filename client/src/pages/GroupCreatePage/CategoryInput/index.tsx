import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { GroupData } from '../../../types/CreateGroup';
import { setGroupData } from '../../../store/slices/createGroupData';
import { Category } from '../../../types';
import CategoryItem from './CategoryItem';

interface Props {
  categorys: Category[];
}

function CategoryInput({ categorys }: Props): JSX.Element {
  const { category: SelectedCategory } = useSelector<ReducerType, GroupData>(
    (state) => state.createGroupData,
  );
  const dispatch = useDispatch();

  const getCategoryItemElements = () => {
    return categorys.map((category) => (
      <CategoryItem
        key={category.id}
        category={category.name}
        image={category.imageUrl}
        clicked={category.name === SelectedCategory}
        handleCategoryClick={() => dispatch(setGroupData({ category: category.name }))}
      />
    ));
  };
  return (
    <>
      <Title>카테고리를 선택해주세요.</Title>
      <CategoryWrapper>{getCategoryItemElements()}</CategoryWrapper>
    </>
  );
}

const Title = styled.p`
  margin: 30px;
`;
const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin: 0 80px;
`;

export default CategoryInput;
