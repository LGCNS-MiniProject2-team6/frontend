import styled from 'styled-components';

import { Button } from '@/components';

// Figma "Overlay / 기술 검색 배경" (node 278:3265)
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgb(23 23 27 / 40%);
`;

export const Popup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 27.5rem;
  max-width: 100%;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius.modal};
  background-color: ${({ theme }) => theme.colors.violet.vt000};
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 16%);
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;

  @media (width <= 48rem) {
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.header.h3};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.grayScale.gy700};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 15rem;
  overflow-y: auto;
`;

export const Hint = styled.p`
  color: ${({ theme }) => theme.colors.grayScale.gy500};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const ConfirmButton = styled(Button)`
  width: 100%;
`;
