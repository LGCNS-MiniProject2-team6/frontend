import { css } from 'styled-components';

const available = ':not(:disabled, [aria-disabled="true"], [aria-busy="true"])';

export const subtleInteraction = css`
  @media (hover: hover) and (pointer: fine) {
    &${available}:hover {
      background-color: var(--interaction-hover, ${({ theme }) => theme.colors.violet.vt200});
    }
  }

  &${available}:active {
    filter: brightness(0.92);
  }
`;
