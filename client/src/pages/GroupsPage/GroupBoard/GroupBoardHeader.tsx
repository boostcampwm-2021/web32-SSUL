import React from 'react';
import styled from '@emotion/styled';
import PlusIcon from '@assets/icon_plus.png';

function GroupBoardHeader(): JSX.Element {
  return (
    <Container>
      <GroupDate>그룹 게시판</GroupDate>
      <Image src={PlusIcon} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 38px;
`;

const GroupDate = styled.span`
  font-size: 1.625rem;
  font-weight: 700;
  color: ${(props) => props.theme.Primary};
  padding-left: 10px;
  margin: 0px;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  filter: invert(17%) sepia(7%) saturate(21%) hue-rotate(353deg) brightness(104%) contrast(94%);
  cursor: pointer;
  &:hover {
    filter: invert(56%) sepia(94%) saturate(1898%) hue-rotate(130deg) brightness(95%) contrast(101%);
    transition: 0.3s ease;
  }
  margin-right: 12px;
`;

export default GroupBoardHeader;
