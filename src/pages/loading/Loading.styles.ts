import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.violet.vt000};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (width <= 48rem) {
    padding: 1rem;
    overflow-wrap: anywhere;
  }
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.header.h1};
  color: ${({ theme }) => theme.colors.grayScale.gy900};
  text-align: center;
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.violet.vt500};
`;

export const Description = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;
