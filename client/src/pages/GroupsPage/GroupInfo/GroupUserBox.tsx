import React from 'react';
import styled from '@emotion/styled';
import GroupUserBoxItem from './GroupUserBoxItem';

function GroupUserBox(): JSX.Element {
  const boxItems = [...Array(12)].map((_, idx) => <GroupUserBoxItem key={idx} />);
  return <Container>{boxItems}</Container>;
}

const Container = styled.div`
  display: grid;
  justify-content: center;
  gap: 10px;
  grid-template-columns: repeat(6, 60px);
  grid-template-rows: repeat(5, 80px);
  width: 480px;
  padding: 16px;
  border: 1px solid ${(props) => props.theme.Gray6};
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

export default GroupUserBox;
