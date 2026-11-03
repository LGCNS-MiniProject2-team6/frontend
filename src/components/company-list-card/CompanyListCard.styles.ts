import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ChevronRightSvg from '@/assets/icons/chevron-right.svg?react';
import RecommendBadgeSvg from '@/assets/icons/recommend-badge.svg?react';

// Figma 공통 컴포넌트 Company List Card (node 251:406). 길이는 Figma px ÷ 16 으로 rem 환산.
// $dimmed: 관련 없는 기업(matchedSkillCount 0). 시안에 연한 상태가 없어 투명도만 낮췄다
export const Card = styled(Link)<{ $dimmed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.cardPadding};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: ${({ theme }) => theme.radius.card};
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  text-decoration: none;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.5 : 1)};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.violet.vt200};
      box-shadow: 0 4px 16px 0 rgb(0 0 0 / 8%);
      transform: translateY(-0.125rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 3.875rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 0.77rem;
  background-color: ${({ theme }) => theme.colors.grayScale.gy100};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Name = styled.p`
  ${({ theme }) => theme.fonts.header.h3};
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: nowrap;
`;

export const RecommendBadge = styled(RecommendBadgeSvg)`
  flex-shrink: 0;
  width: 1.375rem;
  height: 1.375rem;
`;

export const Description = styled.p`
  ${({ theme }) => theme.fonts.body.large400};
  color: ${({ theme }) => theme.colors.grayScale.gy900};
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const ChevronWrap = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const Chevron = styled(ChevronRightSvg)`
  width: 0.5rem;
  height: 0.875rem;
`;
