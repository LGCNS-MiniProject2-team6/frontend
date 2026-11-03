import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sectionGap};
  padding: 1.625rem 1.75rem;

  @media (width <= 48rem) {
    padding: 1rem;
    overflow-wrap: anywhere;
  }
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.header.h3};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.cardGap};
  width: 100%;
`;
