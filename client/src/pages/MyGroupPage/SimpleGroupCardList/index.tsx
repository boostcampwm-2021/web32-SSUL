import React from 'react';
import styled from '@emotion/styled';
import { SimpleGroupCard as SimpleGroupCardData } from '@types';
import SimpleGroupCard from '../SimpleGroupCard';

interface SimpleGroupCardListProps {
  title: string;
  groups: SimpleGroupCardData[];
  isClickable: boolean;
}

function SimpleGroupCardList(props: SimpleGroupCardListProps): JSX.Element {
  const { title, groups, isClickable } = props;
  return (
    <Container>
      <CardListHeader>{title}</CardListHeader>
      <ScrollConatiner>
        {groups.map((group) => (
          <SimpleGroupCard key={group.id} group={group} isClickable={isClickable} />
        ))}
      </ScrollConatiner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 18%;
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.Gray4};
  margin-right: 32px;
  background-color: #f6f8fa;
`;

const CardListHeader = styled.span`
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 30px;
`;

const ScrollConatiner = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export default SimpleGroupCardList;
