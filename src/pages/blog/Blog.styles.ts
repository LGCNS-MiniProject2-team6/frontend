import { BookmarkButton } from '@/components/bookmark-button';
import styled, { keyframes } from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react';
import ExternalLinkIcon from '@/assets/icons/external-link.svg?react';
import AiGuideIcon from '@/assets/icons/ai-guide.svg?react';

// 최초 진입시에만 적용
const bounce = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.375rem);
  }
`;

const ring = keyframes`
  0% {
    opacity: 0.45;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1.6);
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 7.5rem 1rem;

  @media (width <= 64rem) {
    padding: 1rem;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.5rem;
  background-color: transparent;
  cursor: pointer;

  ${subtleInteraction};
`;

export const BackIcon = styled(ChevronLeftIcon)`
  width: 0.6875rem;
  height: 0.6875rem;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  flex-wrap: wrap;
  overflow-wrap: anywhere;
`;

export const Date = styled.p`
  ${({ theme }) => theme.fonts.body.large400};
  color: ${({ theme }) => theme.colors.violet.vt500};
  white-space: nowrap;
`;

export const RelativeDate = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
  white-space: nowrap;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: 100%;
  flex-wrap: wrap;
  overflow-wrap: anywhere;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.header.h2};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const TitleSpacer = styled.div`
  flex: 1;
`;

export const IconButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.violet.vt200};
  cursor: pointer;

  --interaction-hover: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.violet.vt200} 85%,
    ${({ theme }) => theme.colors.violet.vt500}
  );
  ${subtleInteraction};
`;

export const ExternalLinkIconGlyph = styled(ExternalLinkIcon)`
  width: 1.25rem;
  height: 1.25rem;
`;

export const Body = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

export const OriginalArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  padding: 1.875rem 7.5rem;

  @media (width <= 64rem) {
    padding: 1rem;
  }
`;

// 서버 contentHtml 을 그대로 그리는 영역
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;
  min-width: 0;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${({ theme }) => theme.fonts.header.h3};
    color: ${({ theme }) => theme.colors.grayScale.black};
    margin-top: 1.875rem;
    margin-bottom: 0.625rem;
  }

  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child {
    margin-top: 0;
  }

  p {
    ${({ theme }) => theme.fonts.body.medium400};
    color: ${({ theme }) => theme.colors.grayScale.gy900};
    line-height: 180%;
  }

  ul,
  ol {
    ${({ theme }) => theme.fonts.body.medium400};
    color: ${({ theme }) => theme.colors.grayScale.gy900};
    line-height: 220%;
    padding-left: 1.25rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  li {
    margin-top: 0.25rem;
  }

  strong,
  b {
    font-weight: 700;
  }

  em,
  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  del {
    text-decoration: line-through;
  }

  sup {
    vertical-align: super;
    font-size: 0.75em;
  }

  sub {
    vertical-align: sub;
    font-size: 0.75em;
  }

  mark {
    background-color: ${({ theme }) => theme.colors.violet.vt200};
  }

  a {
    color: ${({ theme }) => theme.colors.violet.vt500};
    text-decoration: underline;
  }

  hr {
    margin: 0.5rem 0;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  }

  blockquote {
    padding: 0.25rem 0 0.25rem 1rem;
    border-left: 3px solid ${({ theme }) => theme.colors.grayScale.gy300};
    color: ${({ theme }) => theme.colors.grayScale.gy700};
  }

  code {
    ${({ theme }) => theme.fonts.body.small400};
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.colors.grayScale.gy100};
    white-space: pre-wrap;
    word-break: break-word;
  }

  pre {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.grayScale.gy100};
    overflow-x: auto;
  }

  pre code {
    padding: 0;
    background-color: transparent;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  video {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* figure 로 감싼 이미지는 figure 쪽에 패딩을 주므로, 캡션까지 안쪽에 딸려 오지 않게 이미지 자체는 뺌 */
  img:not(figure img) {
    padding: 1.25rem 0;
  }

  iframe,
  svg {
    max-width: 100%;
  }

  figure {
    margin: 0;
    padding: 1.25rem 0;
  }

  figcaption {
    ${({ theme }) => theme.fonts.body.small400};
    color: ${({ theme }) => theme.colors.grayScale.gy700};
  }

  /* table-layout: fixed 로 칸 폭을 강제해서, 긴 내용은 옆으로 넘치지 않고 칸 안에서 줄바꿈하도록 강제 */
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    margin: 1.25rem 0;
  }

  th,
  td {
    padding: 0.5rem 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
    word-break: break-word;
    text-align: left;
  }

  th {
    ${({ theme }) => theme.fonts.body.medium400};
    background-color: ${({ theme }) => theme.colors.violet.vt100};
  }

  td {
    ${({ theme }) => theme.fonts.body.small400};
    color: ${({ theme }) => theme.colors.grayScale.gy900};
  }

  tr:first-child th:first-child,
  tr:first-child td:first-child {
    border-top-left-radius: 0.75rem;
  }

  tr:first-child th:last-child,
  tr:first-child td:last-child {
    border-top-right-radius: 0.75rem;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 0.75rem;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 0.75rem;
  }

  [role='table'] {
    display: table;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    margin: 1.25rem 0;
  }

  [role='row'] {
    display: table-row;
  }

  [role='cell'],
  [role='columnheader'] {
    display: table-cell;
    ${({ theme }) => theme.fonts.body.small400};
    color: ${({ theme }) => theme.colors.grayScale.gy900};
    padding: 0.5rem 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
    word-break: break-word;
    text-align: left;
    vertical-align: top;
  }

  [role='row']:first-child [role='cell'] {
    ${({ theme }) => theme.fonts.body.medium400};
    background-color: ${({ theme }) => theme.colors.violet.vt100};
  }

  [role='row']:first-child [role='cell']:first-child {
    border-top-left-radius: 0.75rem;
  }

  [role='row']:first-child [role='cell']:last-child {
    border-top-right-radius: 0.75rem;
  }

  [role='row']:last-child [role='cell']:first-child {
    border-bottom-left-radius: 0.75rem;
  }

  [role='row']:last-child [role='cell']:last-child {
    border-bottom-right-radius: 0.75rem;
  }

  overflow-wrap: anywhere;

  @media (width <= 48rem) {
    table {
      display: block;
      overflow-x: auto;
    }
  }
`;

export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2.5rem 1.375rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: 0.75rem;
  text-align: center;
`;

export const NoticeTitle = styled.p`
  ${({ theme }) => theme.fonts.body.large400};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const NoticeDescription = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;

export const AiGuideToggle = styled.button`
  position: fixed;
  right: max(clamp(1rem, 3vw, 2rem), env(safe-area-inset-right));
  bottom: max(clamp(1rem, 3vw, 2rem), env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.violet.vt500};
  box-shadow: -2px 4px 16px 0 rgb(0 0 0 / 18%);
  cursor: pointer;
  animation: ${bounce} 1s ease-in-out 3;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    border-radius: inherit;
    background-color: ${({ theme }) => theme.colors.violet.vt500};
    animation: ${ring} 1s ease-out 3;
  }

  --interaction-hover: color-mix(in srgb, ${({ theme }) => theme.colors.violet.vt500} 88%, black);
  ${subtleInteraction};
`;

export const AiGuideToggleIcon = styled(AiGuideIcon)`
  width: 1.25rem;
  height: 1.25rem;
`;

export const DetailBookmarkButton = styled(BookmarkButton)`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
