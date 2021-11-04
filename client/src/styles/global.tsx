import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const style = css`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    box-sizing: border-box;
  }
`;

function GlobalStyle(): JSX.Element {
  return <Global styles={style} />;
}

const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { VerticalLayout };

export default GlobalStyle;
