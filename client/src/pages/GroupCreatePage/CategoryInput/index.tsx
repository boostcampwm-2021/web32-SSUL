import React from 'react';
import styled from '@emotion/styled';
import { groupCreateDataState, setGroupData } from '@store/group/makerSlice';
import { Category } from '@types';
import CategoryItem from './CategoryItem';
import { useAppDispatch, useAppSelector } from '@hooks';
import { CATEGORY_INTRO } from '@constants/consts';

interface Props {
  categorys: Category[];
}

function CategoryInput({ categorys }: Props): JSX.Element {
  const { categoryId: SelectedCategory } = useAppSelector(groupCreateDataState);
  const dispatch = useAppDispatch();

  const getCategoryItemElements = () => {
    return categorys.map((category) => (
      <CategoryItem
        key={category.id}
        category={category.name}
        image={category.imageUrl}
        clicked={category.id === SelectedCategory}
        handleCategoryClick={() => dispatch(setGroupData({ categoryId: category.id }))}
      />
    ));
  };
  return (
    <>
      <Title>{CATEGORY_INTRO}</Title>
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
