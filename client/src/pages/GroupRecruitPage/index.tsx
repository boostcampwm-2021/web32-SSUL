import React from 'react';
import styled from '@emotion/styled';
import { SearchFilter } from '@components';
import GroupCardList from './GroupCardList';
import plusIcon from '@assets/icon_plus.png';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@hooks';
import { selectUser } from '@store/user/globalSlice';

function GroupRecruitPage(): JSX.Element {
  const { id } = useAppSelector(selectUser);

  return (
    <Container>
      <SideLayout />
      <Contents>
        <SearchFilter />
        <GroupCardList />
      </Contents>
      <SideLayout>
        {!!id && (
          <FloatingButton to={{ pathname: `/group/create` }}>
            <FloatingImg src={plusIcon} />
          </FloatingButton>
        )}
      </SideLayout>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideLayout = styled.div`
  display: flex;
  width: 20%;
`;

const Contents = styled.div`
  display: flex;
  width: 60%;

  justify-content: center;
  flex-direction: column;
  min-width: 1000px;
  margin: 20px;
`;

const FloatingButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 100px;
  margin: 10px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-align: center;

  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  color: ${(props) => props.theme.White};
  background-color: ${(props) => props.theme.Primary};

  &:hover {
    color: ${(props) => props.theme.White};
  }
`;

const FloatingImg = styled.img`
  width: 24px;
  filter: invert();
`;

export default GroupRecruitPage;
