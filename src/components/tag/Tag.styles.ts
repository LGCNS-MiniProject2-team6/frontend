import styled, { css } from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

import type { TagVariant } from './Tag.types';

// Figma 공통 컴포넌트 Tag (node 171:522). 길이는 Figma px ÷ 16 으로 rem 환산.
const variantStyle = {
  // 직무 · 추천 기술 · 검색 창의 저장된 기술. 선택되면 연보라
  pill: css<{ $selected: boolean }>`
    padding: 0.375rem 0.6875rem;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    color: ${({ theme }) => theme.colors.grayScale.gy700};
    ${({ theme }) => theme.fonts.body.small400};

    ${({ $selected }) =>
      $selected &&
      css`
        border-color: ${({ theme }) => theme.colors.violet.vt500};
        background-color: ${({ theme }) => theme.colors.violet.vt200};
        color: ${({ theme }) => theme.colors.violet.vt500};
      `}

    &:disabled {
      border-color: ${({ theme }) => theme.colors.grayScale.gy100};
      background-color: ${({ theme }) => theme.colors.grayScale.gy100};
      color: ${({ theme }) => theme.colors.grayScale.gy300};
    }
  `,

  // 사용자가 고른 보유 · 관심 기술. 누르면 해제된다
  removable: css`
    gap: 0.375rem;
    padding: 0.5rem 0.625rem 0.5rem 0.875rem;
    border: none;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.colors.violet.vt200};
    color: ${({ theme }) => theme.colors.violet.vt500};
    ${({ theme }) => theme.fonts.body.medium400};
  `,
};

export const Tag = styled.button<{ $variant: TagVariant; $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;

  ${({ $variant }) => variantStyle[$variant]};

  &:disabled {
    cursor: not-allowed;
  }

  --interaction-hover: ${({ $selected, theme }) =>
    $selected
      ? `color-mix(in srgb, ${theme.colors.violet.vt200} 85%, ${theme.colors.violet.vt500})`
      : theme.colors.violet.vt200};
  ${subtleInteraction};
`;

export const RemoveIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.75rem;
  height: 0.75rem;

  svg {
    width: 0.5rem;
    height: 0.5rem;
  }
`;
