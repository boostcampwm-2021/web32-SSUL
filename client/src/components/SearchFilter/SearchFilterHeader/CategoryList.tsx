import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { categoryHttpClient } from '@api';
import { Category } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  returnGroupRecruitFilterState,
  checkCategory,
  createdFilterdQuery,
} from '@store/group/filterSlice';
import { useLocation } from 'react-router';

interface CategoryState {
  id: number;
}

function CategoryList(): JSX.Element {
  const [baseCategoryList, setBaseCategoryList] = useState<Category[]>([]);
  const { selectedCategoryId } = useAppSelector(returnGroupRecruitFilterState);
  const groupRecruitDispatch = useAppDispatch();
  const location = useLocation<CategoryState>();

  useEffect(() => {
    const { id } = location.state ?? { id: 0 };

    const getCategoryListData = async () => {
      const categoryList = await categoryHttpClient.getCategories();
      setBaseCategoryList(categoryList);
      groupRecruitDispatch(checkCategory(id));
      groupRecruitDispatch(createdFilterdQuery());
    };
    getCategoryListData();
  }, []);

  const handleSelectedCategoryClick = () => {
    groupRecruitDispatch(checkCategory(0));
    groupRecruitDispatch(createdFilterdQuery());
  };

  const handleNonSelectedCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedCategoryId = Number(e.currentTarget.id);
    groupRecruitDispatch(checkCategory(selectedCategoryId));
    groupRecruitDispatch(createdFilterdQuery());
  };

  const categoryItems = baseCategoryList.map((category) => {
    if (category.id === selectedCategoryId)
      return (
        <CategoryItemSelect
          onClick={handleSelectedCategoryClick}
          key={category.id}
          id={String(category.id)}
        >
          {category.name}
        </CategoryItemSelect>
      );
    else
      return (
        <CategoryItemNonSelect
          onClick={handleNonSelectedCategoryClick}
          key={category.id}
          id={String(category.id)}
        >
          {category.name}
        </CategoryItemNonSelect>
      );
  });

  return <Container>{categoryItems}</Container>;
}

const Container = styled.h3`
  display: flex;
  width: 65%;
  align-items: center;
  justify-content: space-evenly;
`;

const CategoryItem = styled.button`
  display: flex;
  padding: 8px 10px 8px 10px;
  font-size: 0.95rem;
  border-radius: 10px;

  box-shadow: ${(props) => props.theme.Shadow};
  border-radius: 10px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const CategoryItemNonSelect = styled(CategoryItem)`
  color: ${(props) => props.theme.Gray3};
  background: ${(props) => props.theme.Gray6};
  box-shadow: ${(props) => props.theme.Shadow};
`;

const CategoryItemSelect = styled(CategoryItem)`
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
`;

export default CategoryList;
