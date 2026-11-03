import styled from 'styled-components';

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
  align-items: center;
  gap: 1.125rem;
  width: 26rem;
  max-width: 100%;
  padding: 1.75rem 1.75rem 1.5rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: 0 12px 20px 0 rgb(0 0 0 / 14%);
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;

`;

export const IconBadge = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.violet.vt200};
  color: ${({ theme }) => theme.colors.violet.vt500};
  ${({ theme }) => theme.fonts.header.h3};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.grayScale.black};
  text-align: center;
  ${({ theme }) => theme.fonts.header.h3};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.grayScale.gy700};
  text-align: center;
  ${({ theme }) => theme.fonts.body.large400};
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;

  & > button {
    flex: 1 0 0;
  }
`;
