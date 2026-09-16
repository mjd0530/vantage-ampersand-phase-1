import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-width: 1180px;
    height: 100%;
    margin: 0;
  }

  /* The window owns the viewport; scrolling happens inside the workspace so the
     title bar and sidebar rail stay fixed. */
  body {
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--color-surfaces-canvas);
    color: var(--color-text-icon-primary);
    font-family: var(--font-family);
  }

  button,
  input,
  select {
    font-family: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;
