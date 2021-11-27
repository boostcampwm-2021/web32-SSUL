import React from 'react';
import styled from '@emotion/styled';
import cancelIcon from '@assets/icon_cancel.png';

function ListItem(): JSX.Element {
  return (
    <Item>
      <CreatedDate>조금 전</CreatedDate>
      <Message>
        <span>{'알고리즘 스터디'}</span>
        <span>{' 그룹\n신청이 '}</span>
        <Accept>{'승인'}</Accept>
        <span>{' 되었습니다.'}</span>
      </Message>
      <DeleteButton src={cancelIcon}></DeleteButton>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 12px 20px 12px 20px;
  font-size: 0.8em;
  color: ${(props) => props.theme.Gray3};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.Gray6};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.Gray6};
  }
`;

const Message = styled.span`
  font-weight: 600;
  white-space: pre;
`;

const CreatedDate = styled.span`
  font-weight: 500;
`;

const DeleteButton = styled.img`
  padding: 6px;
  width: 20px;
  height: 20px;
`;

const Accept = styled.span`
  color: ${(props) => props.theme.Primary};
`;

const Decline = styled.span`
  color: ${(props) => props.theme.Error};
`

export default ListItem;
