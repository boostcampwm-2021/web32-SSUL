import React from 'react';
import styled from '@emotion/styled';

function GroupInfoHeader(): JSX.Element {
  return (
    <Container>
      <GroupTitle></GroupTitle>
      <GroupDate></GroupDate>
      <GroupTagBar>
        <GroupTag></GroupTag>
        <GroupTag></GroupTag>
      </GroupTagBar>
    </Container>
  );
}

const Container = styled.div``;

const GroupTitle = styled.span``;

const GroupDate = styled.span``;

const GroupTagBar = styled.div``;

const GroupTag = styled.span``;

export default GroupInfoHeader;
