import React from 'react';
import styled from '@emotion/styled';

function GroupInfoEditBox(): JSX.Element {
  return <Container>그룹 정보 수정박스</Container>;
}

const Container = styled.div`
  width: 400px;
  height: 500px;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;

export default GroupInfoEditBox;
