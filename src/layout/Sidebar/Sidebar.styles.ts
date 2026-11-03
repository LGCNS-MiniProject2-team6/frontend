import styled from 'styled-components';
import StarIconSvg from '@/assets/icons/star.svg?react';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
  position: sticky;
  top: 0;
  gap: 0.25rem;
  width: 11.25rem;
  height: 100vh;
  padding: 1.375rem 0.875rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.violet.vt000};

  @media (width <= 48rem) {
    position: static;
    width: 100%;
    height: auto;
  }

`;

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

export const StarIcon = styled(StarIconSvg)`
  width: 0.541rem;
  height: 0.625rem;
`;

export const Title = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: nowrap;
`;

export const Spacer = styled.div`
  height: 1.125rem;
`;

export const FlexSpacer = styled.div`
  flex: 1;
  width: 100%;

  @media (width <= 48rem) {
    display: none;
  }

`;
