import styled, { css, keyframes } from 'styled-components';

import StarLargeSvg from '@/assets/icons/star-large.svg?react';

// Figma /landing - 2안 (node 362:1337). 배경과 카드는 공통 GradientCard 를 쓴다.
// 시안에 인터랙션(프로토타입 연결)이 없어 등장 · 반짝임은 여기서 정했다.
// 크기는 시안 캡처를 카드 폭(1044px) 기준으로 환산했다: 큰 별 96 · 작은 별 68 · 별과 글 사이 24.

const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.2) rotate(-90deg);
  }

  70% {
    opacity: 1;
    transform: scale(1.12) rotate(8deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  to {
    opacity: 0;
  }
`;

// Landing.tsx 가 이 시간만큼 기다렸다가 이동한다
export const FADE_OUT_MS = 200;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const twinkle = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(0.8) rotate(22.5deg);
  }
`;

// 움직임 줄이기를 켠 사용자에게는 애니메이션 없이 바로 보여 준다
const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

// 화면 아무 곳이나 누르면 바로 다음 화면으로 간다. 시안에서 큰 별 윗단이 카드 위에서 약 153px 이다
export const Body = styled.button<{ $leaving: boolean }>`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding-top: 9.5625rem;
  border: none;
  background: none;
  cursor: pointer;

  ${({ $leaving }) =>
    $leaving &&
    css`
      animation: ${fadeOut} ${FADE_OUT_MS}ms ease-in forwards;
    `}
  @media (width <= 48rem) {
    padding: 1rem;
    overflow-wrap: anywhere;
  }

`;

export const Group = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`;

// 한 바퀴 등장 → 천천히 계속 회전
export const BigStar = styled(StarLargeSvg)`
  width: 6rem;
  height: 6rem;
  opacity: 0;
  animation:
    ${popIn} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
    ${spin} 24s linear 0.7s infinite;
  ${reducedMotion}
`;

// 글 묶음 오른쪽 아래. 글보다 늦게 튀어나온 뒤 반짝인다
export const SmallStar = styled(StarLargeSvg)`
  position: absolute;
  top: calc(100% + 0.375rem);
  left: calc(100% + 2.75rem);
  width: 4.25rem;
  height: 4.25rem;
  opacity: 0;
  animation:
    ${popIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.1s forwards,
    ${twinkle} 2.4s ease-in-out 1.7s infinite;
  ${reducedMotion}
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.header.h1};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

// 세 줄이 차례로 올라온다. $order 는 0부터
export const Line = styled.span<{ $order: number }>`
  opacity: 0;
  animation: ${fadeUp} 0.5s ease-out forwards;
  animation-delay: ${({ $order }) => 0.45 + $order * 0.15}s;
  ${reducedMotion}
`;

export const Highlight = styled.em`
  color: ${({ theme }) => theme.colors.violet.vt500};
  font-style: normal;
`;
