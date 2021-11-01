import React from 'react';
import { Global, css } from '@emotion/react';

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

export default GlobalStyle;
