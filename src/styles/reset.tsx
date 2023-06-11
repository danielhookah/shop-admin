import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	* {
		padding: 0px;
		margin: 0px;
		border: 0px;
		-webkit-tap-highlight-color: transparent;
	}

	*,
	*:before,
	*:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	:focus,
	:active {
		outline: none;
	}

	a:focus,
	a:active {
		outline: none;
	}

	aside,
	nav,
	footer,
	header,
	section {
		display: block;
	}
	
	html,
	body {
		min-height: 100vh;
		margin: 0;
		padding: 0;
		width: 100%;
		font-family: 'Inter', sans-serif;
	}
	
	body {
		overflow-x: hidden;
		-ms-text-size-adjust: 100%;
		-moz-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}
	
	input::-ms-clear {
		display: none;
	}
	
	button {
		cursor: pointer;
	}
	
	button::-moz-focus-inner {
		padding: 0;
		border: 0;
	}
	
	a,
	a:visited {
		text-decoration: none;
	}
	
	a:hover {
		text-decoration: none;
	}
	
	ul li {
		list-style: none;
	}
	
	img {
		vertical-align: top;
	}
`;

export default GlobalStyle;
