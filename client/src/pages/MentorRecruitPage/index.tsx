import React from 'react';
import styled from '@emotion/styled';
import { SearchBar } from '@components';
import {
  changeMentorNameInput,
  returnMentorRecruitFilterState,
  createdFilterdQuery,
} from '@store/mentor/filterSlice';
import { useAppSelector } from '@hooks';
import MentorSearchFilter from './MentorSearchFilter';
import MentorCardList from './MentorCardList';

function MentorRecruitPage(): JSX.Element {
  const { mentorNameInput } = useAppSelector(returnMentorRecruitFilterState);

  return (
    <Container>
      <Header>
        <SearchBar
          searchBarInput={mentorNameInput}
          changeInputEvent={changeMentorNameInput}
          createdFilterdQuery={createdFilterdQuery}
          inputValue={'MENTOR_NAME'}
        />
      </Header>
      <MentorSearchFilter />
      <MentorCardList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 1000px;
  margin: 20px;
`;
const Header = styled.div`
  width: 1000px;
  display: flex;
`;

export default MentorRecruitPage;
