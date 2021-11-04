import React from 'react';
import styled from '@emotion/styled';

interface ItemProp {
  key: number,
  category: string,
  clicked: boolean,
  handleCategoryClick :() => void
}

function CategoryItem({category, clicked, handleCategoryClick}: ItemProp): JSX.Element {
  return(
    <div onClick={handleCategoryClick}>
      {clicked ? <ClickedItem/> : <Item/>}
      <ItemName>{category}</ItemName>
    </div>
  )
}

const ClickedItem = styled.div`
  width: 60px;
  height: 60px;
  margin: auto;
  border-radius: 10px;
  box-shadow: inset 5px 5px 10px #8f8f8f,
    inset -5px -5px 10px #ffffff;
`;

const Item = styled.div`
  width: 60px;
  height: 60px;
  margin: auto;
  border-radius: 10px;
  box-shadow:  5px 5px 10px #8f8f8f,
    -5px -5px 10px #ffffff;
`;

const ItemName = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: ${(props) => props.theme.Gray3};
  font-weight: bold;
  text-align: center;
`;

export default CategoryItem;
