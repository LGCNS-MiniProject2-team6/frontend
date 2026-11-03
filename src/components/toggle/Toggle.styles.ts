import styled from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

// Figma 공통 컴포넌트 Toggle (node 306:759). 길이는 Figma px ÷ 16 으로 rem 환산.
export const Track = styled.button<{ $checked: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 2.25rem;
  height: 1.25rem;
  padding: 0;
  border: none;
  border-radius: 999px;
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.violet.vt500 : theme.colors.grayScale.gy100};
  transition: background-color 0.15s ease;

  --interaction-hover: ${({ $checked, theme }) =>
    $checked ? theme.colors.violet.vt700 : theme.colors.violet.vt200};
  ${subtleInteraction};
`;

export const Thumb = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  transform: translateX(${({ $checked }) => ($checked ? '1rem' : '0')});
  transition: transform 0.15s ease;
`;
