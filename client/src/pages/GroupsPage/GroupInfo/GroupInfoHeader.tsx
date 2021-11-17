import React from 'react';
import styled from '@emotion/styled';

function GroupInfoHeader(): JSX.Element {
  return (
    <Container>
      <GroupDate>2021-11-15 ~ 2021-12-31</GroupDate>
      <GroupStatus>진행중</GroupStatus>
      <GroupTitle>
        나는야 임시 제목, 그룹이죠. 근데 사실 이렇게 그룹 제목이 길수도 있는거잖아요?
      </GroupTitle>
      <GroupTagBar>
        <GroupTag>#Javascript</GroupTag>
        <GroupTag>#React</GroupTag>
        <GroupTag>#Redux</GroupTag>
        <GroupTag>#Cypress</GroupTag>
        <GroupTag>#Figma</GroupTag>
      </GroupTagBar>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 38px;
`;

const GroupTagBar = styled.div`
  margin-bottom: 20px;
  padding-left: 8px;
`;

const GroupTag = styled.span`
  font-size: 0.825rem;
  font-weight: 700;
  color: ${(props) => props.theme.Gray3};
  margin: 4px;
`;

const GroupTitle = styled.p`
  font-size: 1.625rem;
  font-weight: 700;
  color: ${(props) => props.theme.Primary};
  padding-left: 8px;
  margin: 12px 0px 0px 0px;
  overflow: hidden;
`;

const GroupDate = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.Gray3};
  padding-left: 10px;
  margin: 0px;
`;

const GroupStatus = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${(props) => props.theme.Primary};
  padding-left: 10px;
  margin: 0px;
`;

export default GroupInfoHeader;
