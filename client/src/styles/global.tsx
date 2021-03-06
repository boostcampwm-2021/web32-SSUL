import React from 'react';
import { Global, css } from '@emotion/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

function GlobalStyle(): JSX.Element {
  const theme = useTheme();
  const style = css`
    * {
      margin: 0;
      padding: 0;
    }

    body {
      box-sizing: border-box;
      background-color: ${theme.Background};
    }
  `;
  return <Global styles={style} />;
}

const BaseLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const VerticalLayout = styled(BaseLayout)`
  flex-direction: column;
  align-items: center;
`;

const HorizontalLayout = styled(BaseLayout)`
  flex-direction: row;
  align-items: center;
`;

const CenterLayout = styled(BaseLayout)`
  justify-content: center;
  align-items: center;
`;

export { BaseLayout, VerticalLayout, HorizontalLayout, CenterLayout };

export default GlobalStyle;
