import styled from 'styled-components';

// Figma /home (node 150:549) 의 오른쪽 영역. 길이는 Figma px ÷ 16 으로 rem 환산.
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4375rem;
  padding: 3.3125rem 1.875rem;

  @media (width <= 48rem) {
    padding: 1rem;
    overflow-wrap: anywhere;
  }

`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.header.h2};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4375rem;
`;
