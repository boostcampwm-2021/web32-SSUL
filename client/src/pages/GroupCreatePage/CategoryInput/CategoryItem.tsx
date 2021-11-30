import React from 'react';
import styled from '@emotion/styled';

interface Props {
  key: number;
  category: string;
  image: string;
  clicked: boolean;
  handleCategoryClick: () => void;
}

function CategoryItem({ category, clicked, image, handleCategoryClick }: Props): JSX.Element {
  return (
    <div onClick={handleCategoryClick}>
      {clicked ? (
        <ClickedItem>
          <CategoryIcon src={image} />
        </ClickedItem>
      ) : (
        <UnClickedItem>
          <CategoryIcon src={image} />
        </UnClickedItem>
      )}
      <ItemName>{category}</ItemName>
    </div>
  );
}

const Item = styled.div`
  width: 60px;
  height: 60px;
  margin: auto;
  border-radius: 10px;
`;

const ClickedItem = styled(Item)`
  box-shadow: inset 2px 2px 5px #8f8f8f, inset -2.5px -2.5px 5px #ffffff;
`;

const UnClickedItem = styled(Item)`
  box-shadow: 2px 2px 5px #8f8f8f, -2.5px -2.5px 5px #ffffff;
`;
const ItemName = styled.p`
  width: 80px;
  margin-top: 10px;
  font-size: 13px;
  color: ${(props) => props.theme.Gray3};
  font-weight: bold;
  text-align: center;
`;

const CategoryIcon = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin-top: 5px;
  margin-bottom: 8px;
`;

export default CategoryItem;
