import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getCategories } from '../../../api/category';
import { Category } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import {
  returnGroupRecruitState,
  groupRecruitType,
  checkCategory,
} from '../../../store/slices/groupRecruitSlice';

function CategoryList(): JSX.Element {
  const [baseCategoryList, setBaseCategoryList] = useState<Category[]>([]);
  const groupRecruitState = useSelector<ReducerType, groupRecruitType>(returnGroupRecruitState);
  const groupRecruitDispatch = useDispatch();

  useEffect(() => {
    const { category } = history.state.state ?? { category: '' };
    const getData = async () => {
      const categoryList = await getCategories();
      setBaseCategoryList(categoryList);
      groupRecruitDispatch(checkCategory(category));
    };
    getData();
  }, []);

  const handleSelectedCategoryClick = () => {
    groupRecruitDispatch(checkCategory(''));
  };

  const handleNonSelectedCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedCategory = e.currentTarget.innerText;
    groupRecruitDispatch(checkCategory(selectedCategory));
  };

  const categoryItems = baseCategoryList.map((category) => {
    if (category.name === groupRecruitState.selectedCategory)
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
