import styled from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

import ChevronDownSvg from '@/assets/icons/chevron-down.svg?react';

// Figma 공통 컴포넌트 Dropdown (node 256:440). 길이는 Figma px ÷ 16 으로 rem 환산.
export const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
`;

export const Select = styled.select`
  ${({ theme }) => theme.fonts.body.small400};
  padding: 0.4375rem 1.5625rem 0.4375rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  cursor: pointer;
  appearance: none;

  ${subtleInteraction};
`;

export const Chevron = styled(ChevronDownSvg)`
  position: absolute;
  right: 0.625rem;
  width: 0.5625rem;
  height: 0.375rem;
  pointer-events: none;
`;
