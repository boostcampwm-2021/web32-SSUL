import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { SimpleGroupCardData } from '@types';

interface SimpleGroupCardProps {
  group: SimpleGroupCardData;
  isClickable: boolean;
}

function SimpleGroupCard(props: SimpleGroupCardProps): JSX.Element {
  const history = useHistory();

  const { group, isClickable } = props;
  const { id, curUserCnt, maxUserCnt, name, ownerInfo, status } = group;

  const groupCardClickHandler = () => {
    if (isClickable) {
      history.push(`/group/${id}`);
    }
  };

  return (
    <Container isClickable={isClickable} onClick={groupCardClickHandler}>
      <GroupName>{name}</GroupName>
      <GroupUserCounter>
        {curUserCnt}/{maxUserCnt}
      </GroupUserCounter>
      <GroupStatus>{status}</GroupStatus>
      <GroupFooter>
        <GroupOwnerAvatar src={ownerInfo.avatarUrl} />
      </GroupFooter>
    </Container>
  );
}

const Container = styled.div<{ isClickable: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  height: 120px;
  border-radius: 8px;
  border: 1px ${(props) => props.theme.Gray4} solid;
  margin-bottom: 16px;
  margin-right: 4px;
  cursor: ${(props) => (props.isClickable ? 'pointer' : '')};
  background-color: #fff;

  &:hover {
    border: 1px ${(props) => props.theme.Primary} solid;
  }
`;

const GroupName = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
  word-break: break-all;
`;

const GroupUserCounter = styled.span`
  font-size: 0.7rem;
`;

const GroupStatus = styled.span`
  font-size: 0.8rem;
`;

const GroupFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const GroupOwnerAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export default SimpleGroupCard;
