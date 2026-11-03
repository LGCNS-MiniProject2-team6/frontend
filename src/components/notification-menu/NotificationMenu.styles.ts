import styled from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

export const Trigger = styled.button`
  position: relative;
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  place-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background: transparent;
  color: inherit;
  ${subtleInteraction};
`;

export const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 1rem;
  padding: 0.125rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.violet.vt500};
  color: ${({ theme }) => theme.colors.grayScale.white};
  font-size: 0.625rem;
`;

export const Dialog = styled.dialog`
  position: fixed;
  inset: 4.5rem 1rem auto auto;
  width: 24rem;
  max-width: calc(100vw - 2rem);
  max-height: calc(100dvh - 5.5rem);
  margin: 0;
  padding: 0;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: ${({ theme }) => theme.radius.modal};
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  box-shadow: 0 0.75rem 2rem rgb(0 0 0 / 12%);

  &::backdrop {
    background: rgb(0 0 0 / 15%);
  }

  @media (width <= 48rem) {
    inset: 0;
    width: 100%;
    max-width: 100%;
    height: 100dvh;
    max-height: 100dvh;
    border: none;
    border-radius: 0;
  }
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
`;

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.header.h3};
`;

export const Body = styled.div`
  padding-bottom: env(safe-area-inset-bottom);
`;

export const Message = styled.p`
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.grayScale.gy500};
  text-align: center;
  overflow-wrap: anywhere;
  ${({ theme }) => theme.fonts.body.medium400};
`;

export const Error = styled.div`
  padding-bottom: 1rem;
  text-align: center;
`;

export const Retry = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background-color: ${({ theme }) => theme.colors.violet.vt200};
  color: ${({ theme }) => theme.colors.violet.vt500};
  ${subtleInteraction};
`;

export const List = styled.ul`
  list-style: none;
`;

export const Item = styled.button<{ $unread: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  background-color: ${({ $unread, theme }) => ($unread ? theme.colors.violet.vt000 : theme.colors.grayScale.white)};
  color: inherit;
  text-align: left;
  overflow-wrap: anywhere;
  ${subtleInteraction};
`;

export const ItemTitle = styled.span`
  ${({ theme }) => theme.fonts.body.medium400};
`;

export const DateLabel = styled.span`
  color: ${({ theme }) => theme.colors.grayScale.gy500};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const Unread = styled.span`
  color: ${({ theme }) => theme.colors.violet.vt500};
  ${({ theme }) => theme.fonts.body.small400};
`;
