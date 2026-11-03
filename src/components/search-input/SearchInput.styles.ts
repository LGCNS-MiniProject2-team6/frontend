import styled from 'styled-components';

import SearchSvg from '@/assets/icons/search.svg?react';

// Figma 공통 컴포넌트 Search Input (node 298:614)
export const Container = styled.label`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 0.6875rem 0.75rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  cursor: text;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.violet.vt500};
  }
`;

export const Icon = styled(SearchSvg)`
  flex-shrink: 0;
  width: 0.8125rem;
  height: 0.8125rem;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gy700};
  }
`;
