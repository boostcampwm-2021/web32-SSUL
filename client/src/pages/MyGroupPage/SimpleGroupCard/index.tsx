import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { SimpleGroupCard as SimpleGroupCardData } from '@types';
import { useToast } from '@hooks';
import { ToastMessageEnum } from '@constants/enums';
import { MSG_NOT_JOIN_ERROR } from '@constants/consts';

interface SimpleGroupCardProps {
  group: SimpleGroupCardData;
  isClickable: boolean;
}

function SimpleGroupCard(props: SimpleGroupCardProps): JSX.Element {
  const history = useHistory();

  const { group, isClickable } = props;
  const { id, curUserCnt, maxUserCnt, name, ownerInfo, status } = group;
  const [notify] = useToast();

  const groupCardClickHandler = () => {
    if (isClickable) {
      history.push(`/group/${id}`);
    } else {
      notify(MSG_NOT_JOIN_ERROR, ToastMessageEnum.ERROR);
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
        <GroupOwnerAvatar src={ownerInfo.avatarUrl} alt="깃허브 프로필 이미지" />
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
  margin-bottom: 16px;
  cursor: ${(props) => (props.isClickable ? 'pointer' : '')};
  border: 1.75px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};

  &:hover {
    border: 1.75px ${(props) => props.theme.Primary} solid;
  }
`;

const GroupName = styled.span`
  font-weight: 700;
  font-size: 0.9rem;
  word-break: break-all;
`;

const GroupUserCounter = styled.span`
  font-size: 0.7rem;
  color: ${(props) => props.theme.Gray3};
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
