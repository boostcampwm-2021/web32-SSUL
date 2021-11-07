import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getCategories } from '@api/category';
import { Category } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  returnGroupRecruitFilterState,
  groupRecruitType,
  checkCategory,
} from '../../../store/slices/groupRecruitFilterSlice';

function CategoryList(): JSX.Element {
  const [baseCategoryList, setBaseCategoryList] = useState<Category[]>([]);
  const selectedCategory = useAppSelector<groupRecruitType>(
    returnGroupRecruitFilterState,
  ).selectedCategory;
  const groupRecruitDispatch = useAppDispatch();

  useEffect(() => {
    const { category } = history.state.state ?? { category: '' };
    const getCategoryListData = async () => {
      const categoryList = await getCategories();
      setBaseCategoryList(categoryList);
      groupRecruitDispatch(checkCategory(category));
    };
    getCategoryListData();
  }, []);

  const handleSelectedCategoryClick = () => {
    groupRecruitDispatch(checkCategory(''));
  };

  const handleNonSelectedCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedCategory = e.currentTarget.innerText;
    groupRecruitDispatch(checkCategory(selectedCategory));
  };

  const categoryItems = baseCategoryList.map((category) => {
    if (category.name === selectedCategory)
      return (
        <CategoryItemSelect onClick={handleSelectedCategoryClick} key={category.id}>
          {category.name}
        </CategoryItemSelect>
      );
    else
      return (
        <CategoryItemNonSelect onClick={handleNonSelectedCategoryClick} key={category.id}>
          {category.name}
        </CategoryItemNonSelect>
      );
  });

  return <Container>{categoryItems}</Container>;
}

const Container = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
`;

const CategoryItem = styled.button`
  display: flex;
  margin: 5px;
  padding: 10px;

  box-shadow: 10px 10px 10px -5px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const CategoryItemNonSelect = styled(CategoryItem)`
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Gray5};
`;

const CategoryItemSelect = styled(CategoryItem)`
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
`;

export default CategoryList;
