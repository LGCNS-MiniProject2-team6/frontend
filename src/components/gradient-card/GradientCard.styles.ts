import styled from 'styled-components';

// Figma /login - 2안 (node 278:2956) · /userInput - 2안 (node 278:3001) 의 공통 배경과 가운데 카드.
// 배경 그라데이션은 변수가 아닌 프레임 채우기 색이다.
// 피그마 값은 정지점 순서가 뒤섞여 CSS 에선 중간에 경계가 생겨서, 시안 렌더와 같아 보이게 순서만 바로잡았다
export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 4.875rem;
  background-image: linear-gradient(
    180deg,
    rgb(231 227 255) 0%,
    rgb(137 122 220) 50%,
    rgb(100 73 251) 100%
  );

  @media (width <= 64rem) {
    padding: clamp(1rem, 4vw, 2.5rem);
  }
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 65.25rem;
  min-height: 43.75rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background-color: ${({ theme }) => theme.colors.violet.vt000};
  box-shadow: 0 1.875rem 5rem rgb(0 0 0 / 35%);
  max-width: 100%;

  @media (width <= 48rem) {
    min-height: auto;
  }
`;
