import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Figma 공통 컴포넌트 Article Card v5 (node 272:405). 길이는 Figma px ÷ 16 으로 rem 환산.
// 카드 안에 버튼이 있어 카드 전체를 링크로 감쌀 수 없다(a 안에 button 불가).
// 그래서 제목 링크의 ::after 를 카드 전체로 늘리고, 버튼들은 그 위로 올린다.
export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.cardPadding};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.violet.vt200};
    box-shadow: 0 4px 16px 0 rgb(0 0 0 / 8%);
    transform: translateY(-0.125rem);
  }
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.125rem;
  min-width: 0;
`;

export const CompanyTag = styled.span`
  ${({ theme }) => theme.fonts.body.small400};
  padding: 0.1875rem 0.5625rem;
  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.grayScale.gy900};
  color: ${({ theme }) => theme.colors.grayScale.white};
  white-space: nowrap;
`;

export const Actions = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.5rem;
`;

export const Date = styled.time`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;

export const Title = styled.h3`
  ${({ theme }) => theme.fonts.header.h3};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const TitleLink = styled(Link)`
  &::after {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    content: '';
  }
`;

export const Summary = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy900};
`;
