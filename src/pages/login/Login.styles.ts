import styled from 'styled-components';

import StarLargeSvg from '@/assets/icons/star-large.svg?react';
import StarSvg from '@/assets/icons/star.svg?react';

// Figma /login - 2안 (node 278:2956). 배경과 카드는 공통 GradientCard 를 쓴다.
// 큰 별은 카드 위에서 115px, 글 묶음은 카드 가운데보다 21px 아래에 있어 padding-top 으로 그만큼 내린다.
export const Body = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-top: 2.625rem;
  text-align: center;

  @media (width <= 48rem) {
    padding: 2rem 1rem;
  }

`;

export const BigStar = styled(StarLargeSvg)`
  position: absolute;
  top: 7.1875rem;
  left: 50%;
  width: 4.5rem;
  height: 4.5rem;
  transform: translateX(-50%);

  @media (width <= 48rem) {
    position: static;
    width: 3rem;
    height: 3rem;
    transform: none;
  }

`;

export const Sigil = styled(StarSvg)`
  width: 1.25rem;
  height: 1.25rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.header.h1};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.header.h3};
  color: ${({ theme }) => theme.colors.grayScale.gy500};
`;

// 오류용 색 변수가 아직 없어 F3 과 같이 vt500 으로 표시한다.
export const ErrorText = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.violet.vt500};
`;
