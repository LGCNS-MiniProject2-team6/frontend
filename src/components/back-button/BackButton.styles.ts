import styled from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

import ChevronLeftSvg from '@/assets/icons/chevron-left.svg?react';

// Figma 공통 컴포넌트 Icon Button - Back (node 255:436). 길이는 Figma px ÷ 16 으로 rem 환산.
export const Button = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  background-color: transparent;

  ${subtleInteraction};
`;

export const Icon = styled(ChevronLeftSvg)`
  width: 0.6875rem;
  height: 0.6875rem;
`;
