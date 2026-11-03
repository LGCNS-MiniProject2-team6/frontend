import styled, { css } from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

export const Item = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  text-align: left;
  cursor: pointer;
  ${({ theme }) => theme.fonts.body.medium400};

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: ${theme.colors.violet.vt200};
          color: ${theme.colors.violet.vt500};
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.grayScale.gy700};
        `}

  --interaction-hover: ${({ $active, theme }) =>
    $active
      ? `color-mix(in srgb, ${theme.colors.violet.vt200} 90%, ${theme.colors.violet.vt500})`
      : theme.colors.violet.vt200};
  ${subtleInteraction};
`;
