import styled from 'styled-components';

import StarSvg from '@/assets/icons/star.svg?react';

// Figma /userInput - 2안 (node 278:3001). 배경과 카드는 공통 GradientCard 를 쓴다.
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 38.1875rem;
  padding: 2rem 0;
  max-width: 100%;

  @media (width <= 48rem) {
    padding: 1.5rem 1rem;
  }

`;

export const Sigil = styled(StarSvg)`
  width: 1.25rem;
  height: 1.25rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.header.h1};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.grayScale.gy500};
  ${({ theme }) => theme.fonts.body.small400};
`;
