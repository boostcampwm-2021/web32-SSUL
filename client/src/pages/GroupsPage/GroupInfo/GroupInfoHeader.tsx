import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks';
import { selectGroupDetail, selectGroupTechStack } from '@store/group/detailSlice';
import { formatDateToString, classifyDate } from '@utils/Date';

function GroupInfoHeader(): JSX.Element {
  const groupDetail = useAppSelector(selectGroupDetail);
  const groupTechStack = useAppSelector(selectGroupTechStack);
  const groupTechStackList = groupTechStack.map((stack, idx) => (
    <GroupTag key={idx}>#{stack.name}</GroupTag>
  ));

  return (
    <Container>
      <GroupDate>
        {formatDateToString(groupDetail.startAt)} ~ {formatDateToString(groupDetail.endAt)}
      </GroupDate>
      <GroupStatus>{classifyDate(groupDetail.startAt, groupDetail.endAt)}</GroupStatus>
      <GroupTitle>{groupDetail.name}</GroupTitle>
      <GroupTagBar>{groupTechStackList}</GroupTagBar>
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
