import styled, { type DefaultTheme } from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

import TocDotIcon from '@/assets/icons/toc-dot.svg?react';

// KEY 가 제일 진하고, REF · LIGHT · SKIP 순으로 옅어지는 4단계 배지 색상
const badgeColors = ($badge: string, theme: DefaultTheme) => {
  switch ($badge) {
    case 'KEY':
      return {
        text: theme.colors.violet.vt500,
        background: theme.colors.violet.vt100,
        border: theme.colors.violet.vt500,
      };
    case 'REF':
      return {
        text: theme.colors.grayScale.gy700,
        background: theme.colors.grayScale.white,
        border: theme.colors.grayScale.gy300,
      };
    case 'SKIP':
      return {
        text: theme.colors.grayScale.gy300,
        background: theme.colors.grayScale.white,
        border: theme.colors.grayScale.gy100,
      };
    case 'LIGHT':
    default:
      return {
        text: theme.colors.grayScale.gy500,
        background: theme.colors.grayScale.white,
        border: theme.colors.grayScale.gy100,
      };
  }
};

export const Row = styled.button<{ $highlighted: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.5625rem 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background-color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.violet.vt200 : 'transparent'};
  cursor: pointer;

  ${subtleInteraction};
`;

export const AccentBar = styled.span<{ $highlighted: boolean }>`
  flex-shrink: 0;
  width: 0.1875rem;
  height: 0.875rem;
  border-radius: 0.125rem;
  background-color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.violet.vt500 : theme.colors.grayScale.gy100};
`;

export const Order = styled.span`
  ${({ theme }) => theme.fonts.body.large400};
  flex-shrink: 0;
  min-width: 2ch;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.grayScale.gy500};
  text-align: center;
`;

export const Title = styled.span<{ $highlighted: boolean }>`
  ${({ theme }) => theme.fonts.body.medium400};
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  text-overflow: ellipsis;
  color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.grayScale.black : theme.colors.grayScale.gy900};
`;

export const Badge = styled.span<{ $badge: string }>`
  ${({ theme }) => theme.fonts.body.small400};
  flex-shrink: 0;
  padding: 0.125rem 0.5rem;
  border: 1px solid ${({ $badge, theme }) => badgeColors($badge, theme).border};
  border-radius: 999px;
  color: ${({ $badge, theme }) => badgeColors($badge, theme).text};
  background-color: ${({ $badge, theme }) => badgeColors($badge, theme).background};
`;

export const Dot = styled(TocDotIcon)`
  flex-shrink: 0;
  width: 0.3125rem;
  height: 0.3125rem;
`;
