import React from 'react';
import styled from '@emotion/styled';

interface ItemProp {
  key: number;
  category: string;
  image: string;
  clicked: boolean;
  handleCategoryClick: () => void;
}

function CategoryItem({ category, clicked, image, handleCategoryClick }: ItemProp): JSX.Element {
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
  box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
`;

const UnClickedItem = styled(Item)`
  box-shadow: 5px 5px 10px #8f8f8f, -5px -5px 10px #ffffff;
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
  width: 50px;
  height: 50px;
  margin-top: 5px;
  margin-bottom: 8px;
`;

export default CategoryItem;
