import { dialogBackdropMotion } from '@/styles/panel-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 4rem;
  padding: 0.5rem clamp(0.75rem, 4vw, 3rem);
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  background-color: ${({ theme }) => theme.colors.grayScale.white};
`;

export const Start = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 2vw, 1.5rem);
`;

export const Brand = styled(Link)`
  ${({ theme }) => theme.fonts.header.h2};
  color: ${({ theme }) => theme.colors.violet.vt500};
`;

export const Nav = styled.nav`
  display: flex;
  gap: 0.25rem;

  a {
    padding: 0.625rem 0.75rem;
    border-radius: ${({ theme }) => theme.radius.control};
    ${subtleInteraction};
  }

  a[aria-current='page'] {
    background-color: ${({ theme }) => theme.colors.violet.vt200};
    color: ${({ theme }) => theme.colors.violet.vt500};
  }
`;

export const DesktopNav = styled(Nav)`
  @media (width <= 48rem) {
    display: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const IconButton = styled.button`
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background: transparent;
  color: inherit;
  ${subtleInteraction};

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const MobileMenuButton = styled(IconButton)`
  display: none;

  @media (width <= 48rem) {
    display: grid;
  }
`;

export const Profile = styled.details`
  position: relative;
`;

export const ProfileTrigger = styled.summary`
  display: grid;
  min-height: 2.75rem;
  padding: 0 0.625rem;
  place-items: center;
  border-radius: ${({ theme }) => theme.radius.control};
  cursor: pointer;
  ${subtleInteraction};

  &::-webkit-details-marker {
    display: none;
  }
`;

export const ProfilePanel = styled.div`
  position: absolute;
  z-index: 5;
  top: 100%;
  right: 0;
  display: grid;
  min-width: 9rem;
  padding: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: ${({ theme }) => theme.radius.card};
  background-color: ${({ theme }) => theme.colors.grayScale.white};

  a,
  button {
    font-family: inherit;
    ${({ theme }) => theme.fonts.body.medium400};
    padding: 0.625rem;
    border: none;
    border-radius: ${({ theme }) => theme.radius.control};
    background: transparent;
    color: inherit;
    text-align: left;
    ${subtleInteraction};
  }
`;

export const MobileMenu = styled.dialog`
  ${dialogBackdropMotion};
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  max-height: none;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;

  &::backdrop {
    background: rgb(0 0 0 / 40%);
  }
`;

export const MobilePanel = styled.div`
  width: min(18rem, 85vw);
  height: 100%;
  padding: 0.75rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.grayScale.white};

  nav {
    flex-direction: column;
  }
`;
