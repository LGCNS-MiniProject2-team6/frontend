import styled, { keyframes } from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

import CloseIcon from '@/components/close-icon/CloseIcon';

export const Overlay = styled.button`
  position: fixed;
  inset: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background-color: rgb(0 0 0 / 40%);
  cursor: default;
`;

export const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: min(100%, 33.4375rem);
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.violet.vt000};
  box-shadow: -6px 0 32px 0 rgb(0 0 0 / 16%);
`;

export const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5625rem;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  overflow-y: auto;
  overflow-wrap: anywhere;

  @media (width <= 48rem) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.header.h2};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  background-color: transparent;
  cursor: pointer;

  ${subtleInteraction};
`;

export const CloseIconGlyph = styled(CloseIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

const reveal = keyframes`from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; }`;

export const Card = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${reveal} 180ms ease-out;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: 0.75rem;
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.125rem;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  }
`;

export const CardSectionTitle = styled.p`
  ${({ theme }) => theme.fonts.header.h3};
  color: ${({ theme }) => theme.colors.violet.vt500};
`;

export const CardSectionBody = styled.p`
  ${({ theme }) => theme.fonts.body.medium400};
  color: ${({ theme }) => theme.colors.grayScale.gy900};
`;

export const TocLabel = styled.p`
  ${({ theme }) => theme.fonts.body.medium400};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const TocList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
  width: 100%;
`;

export const ResultArea = styled.div`
  min-height: 16rem;
`;
