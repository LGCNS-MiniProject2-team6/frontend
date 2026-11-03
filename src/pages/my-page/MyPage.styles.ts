import styled from 'styled-components';

// Figma /myPage (node 150:896) 의 오른쪽 영역. 길이는 Figma px ÷ 16 으로 rem 환산.
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export const Description = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;
