import React from 'react';
import styled from '@emotion/styled';

function GroupIntrodction(): JSX.Element {
  return (
    <Container>
      <Content>
        술 한잔 했습니다..
        <br /> 개인사 하나만 기억해주세요 진심을 다해 전합니다. <br />
        밤낮으로 고민하고 개발했습니다 ...
        <br />
        최선을 다했고 열심히 했습니다 저의 진심이 느껴지길 바랍니다 고맙습니다... <br />
        그만큼 서비스가 재밌다는.. ㅋㅋ
        <br />
        술 한잔 했습니다..
        <br /> 개인사 하나만 기억해주세요 진심을 다해 전합니다. <br />
        밤낮으로 고민하고 개발했습니다 ...
        <br />
        최선을 다했고 열심히 했습니다 저의 진심이 느껴지길 바랍니다 고맙습니다... <br />
        그만큼 서비스가 재밌다는.. ㅋㅋ
        <br />
        술 한잔 했습니다..
        <br /> 개인사 하나만 기억해주세요 진심을 다해 전합니다. <br />
        밤낮으로 고민하고 개발했습니다 ...
        <br />
        최선을 다했고 열심히 했습니다 저의 진심이 느껴지길 바랍니다 고맙습니다... <br />
        그만큼 서비스가 재밌다는.. ㅋㅋ
        <br />
        술 한잔 했습니다..
        <br /> 개인사 하나만 기억해주세요 진심을 다해 전합니다. <br />
        밤낮으로 고민하고 개발했습니다 ...
        <br />
        최선을 다했고 열심히 했습니다 저의 진심이 느껴지길 바랍니다 고맙습니다... <br />
        그만큼 서비스가 재밌다는.. ㅋㅋ
        <br />
        술 한잔 했습니다..
        <br /> 개인사 하나만 기억해주세요 진심을 다해 전합니다. <br />
        밤낮으로 고민하고 개발했습니다 ...
        <br />
        최선을 다했고 열심히 했습니다 저의 진심이 느껴지길 바랍니다 고맙습니다... <br />
        그만큼 서비스가 재밌다는.. ㅋㅋ
        <br />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 480px;
  padding: 16px;
  border: 1px solid ${(props) => props.theme.Gray6};
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

const Content = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${(props) => props.theme.Gray1};
`;

export default GroupIntrodction;
