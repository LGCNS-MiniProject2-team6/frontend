import styled, { css } from 'styled-components';

import type { ButtonVariant } from './Button.types';

// Figma 공통 컴포넌트 Button (node 171:509). 길이는 Figma px ÷ 16 으로 rem 환산.
const variantStyle = {
  // 화면의 주 CTA. TODO: Figma 상 hover 가 default 와 값이 같음 (디자인 확인 필요)
  primary: css`
    padding: 0.75rem 1.25rem;
    background-color: ${({ theme }) => theme.colors.violet.vt500};
    color: ${({ theme }) => theme.colors.grayScale.white};
  `,

  // primary 옆 보조 액션. 호버하면 연보라
  secondary: css`
    padding: 0.75rem 1.25rem;
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    color: ${({ theme }) => theme.colors.grayScale.black};
  `,

  // 되돌릴 수 없는 확인 액션용 (나가기 등)
  warning: css`
    padding: 0.75rem 1.25rem;
    background-color: ${({ theme }) => theme.colors.violet.vt500};
    color: ${({ theme }) => theme.colors.grayScale.white};
  `,

  // 카드 안에서 쓰는 연보라 강조 버튼 (AI 가이드 보기 등)
  soft: css`
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.colors.violet.vt200};
    color: ${({ theme }) => theme.colors.violet.vt500};
  `,
} satisfies Record<ButtonVariant, ReturnType<typeof css>>;

export const Button = styled.button<{ $variant: ButtonVariant }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  white-space: nowrap;
  word-break: break-word;

  ${({ theme }) => theme.fonts.body.medium400};
  ${({ $variant }) => variantStyle[$variant]};

  /* Figma 는 primary/secondary 에만 정의돼 있지만 네 변형에 모두 적용한다. 요청 중(aria-busy)은 제외 */
  &:disabled:not([aria-busy]) {
    background-color: ${({ theme }) => theme.colors.grayScale.gy100};
    color: ${({ theme }) => theme.colors.grayScale.gy300};
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    filter: brightness(0.92);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      filter: brightness(0.96);
    }
  }

  &[aria-busy] {
    cursor: progress;
  }
`;

export const Label = styled.span<{ $hidden: boolean }>`
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
`;

export const Loading = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
