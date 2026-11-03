import { css, keyframes } from 'styled-components';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const fadeOut = keyframes`from { opacity: 1; } to { opacity: 0; }`;

export const dialogBackdropMotion = css`
  @media (prefers-reduced-motion: no-preference) {
    &[open]::backdrop {
      animation: ${fadeIn} 180ms ease-out both;
    }

    &[data-closing='true']::backdrop {
      animation: ${fadeOut} 180ms ease-in both;
    }
  }
`;
