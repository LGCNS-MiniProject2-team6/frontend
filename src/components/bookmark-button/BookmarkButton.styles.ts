import styled from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

import BookmarkFilledSvg from '@/assets/icons/bookmark-filled.svg?react';
import BookmarkOutlineSvg from '@/assets/icons/bookmark-outline.svg?react';

// Figma 공통 컴포넌트 Icon Button - Bookmark (node 310:757). 길이는 Figma px ÷ 16 으로 rem 환산.
export const Button = styled.button<{ $bookmarked: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.625rem;
  height: 1.625rem;
  padding: 0;
  border: none;
  border-radius: 0.4375rem;
  background-color: ${({ $bookmarked, theme }) =>
    $bookmarked ? theme.colors.violet.vt200 : theme.colors.grayScale.white};

  --interaction-hover: ${({ $bookmarked, theme }) =>
    $bookmarked
      ? `color-mix(in srgb, ${theme.colors.violet.vt200} 90%, ${theme.colors.violet.vt500})`
      : theme.colors.violet.vt200};
  ${subtleInteraction};
`;

export const OutlineIcon = styled(BookmarkOutlineSvg)`
  width: 0.75rem;
  height: 0.875rem;
`;

export const FilledIcon = styled(BookmarkFilledSvg)`
  width: 0.75rem;
  height: 0.875rem;
`;
