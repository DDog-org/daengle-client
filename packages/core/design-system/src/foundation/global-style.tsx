import { ReactNode } from 'react';
import { Global, ThemeProvider, css } from '@emotion/react';
import theme from './theme';
import './normalize.css';

const defaultStyles = css`
  :root {
    font-family: 'Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont',
      'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
      'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif';
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
    font-family: inherit;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  *::before,
  *::after {
    box-sizing: border-box !important;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
  }

  a {
    outline: none;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
    background: none;
    padding-block: 0;
    padding-inline: 0;
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
  }

  input {
    outline: none;
    border: none;
    background: none;
  }
`;

interface Props {
  children: ReactNode;
}

export default function GlobalStyle({ children }: Props) {
  return (
    <>
      <Global styles={defaultStyles} />
      <ThemeProvider theme={{ ...theme }}>{children}</ThemeProvider>
    </>
  );
}
