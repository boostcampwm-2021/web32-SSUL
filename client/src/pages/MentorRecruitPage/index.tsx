import React from 'react';
import styled from '@emotion/styled';
import { SearchBar } from '@components';
import { changeMentorNameInput, returnMentorRecruitFilterState } from '@store/mentor/filterSlice';
import { useAppSelector } from '@hooks';
import MentorSearchFilter from './MentorSearchFilter';

function MentorRecruitPage(): JSX.Element {
  const { mentorNameInput } = useAppSelector(returnMentorRecruitFilterState);

  return (
    <Container>
      <Header>
        <SearchBar
          searchBarInput={mentorNameInput}
          changeInputEvent={changeMentorNameInput}
          inputValue={'MENTOR_NAME'}
        />
      </Header>
      <MentorSearchFilter />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  width: 1000px;
  display: flex;
`;

export default MentorRecruitPage;
