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
import { useHistory } from 'react-router';

interface CategorySate {
  id: number;
  category: string;
}

function CategoryList(): JSX.Element {
  const [baseCategoryList, setBaseCategoryList] = useState<Category[]>([]);
  const { selectedCategoryId } = useAppSelector(returnGroupRecruitFilterState);
  const groupRecruitDispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    const { id } = (history.location.state as CategorySate) ?? { id: 0 };

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
  margin: 5px;
  padding: 10px;

  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  border-radius: 10px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const CategoryItemNonSelect = styled(CategoryItem)`
  color: ${(props) => props.theme.Gray3};
  background: ${(props) => props.theme.Gray6};
`;

const CategoryItemSelect = styled(CategoryItem)`
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
`;

export default CategoryList;
