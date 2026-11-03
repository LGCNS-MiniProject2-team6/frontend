import { css } from 'styled-components';

const createFontStyle = (
  size: number,
  weight: number,
  lineHeightPercent: number,
  letterSpacing: number = 0,
) => css`
  font-family:
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: ${size}rem;
  ${
    size >= 1.25 &&
    css`
      @media (width <= 48rem) {
        font-size: clamp(${size * 0.8}rem, calc(${size * 0.65}rem + 1vw), ${size}rem);
      }
    `
  };
  font-style: normal;
  font-weight: ${weight};
  line-height: ${lineHeightPercent}%;
  letter-spacing: ${letterSpacing}rem;
`;

const colors = {
  violet: {
    vt000: '#FBFBFF',
    vt100: '#F9F8FF',
    vt200: '#EDEBFB',
    vt500: '#4A2FE0',
    vt700: '#6D28D9',
  },
  grayScale: {
    white: '#FFFFFF',
    gy100: '#E9E9EA',
    gy300: '#BCBEBF',
    gy500: '#909394',
    gy700: '#63686A',
    gy900: '#373D3F',
    black: '#17171B',
  },
};

const fonts = {
  header: {
    h1: createFontStyle(1.625, 700, 130, -0.035),
    h2: createFontStyle(1.375, 700, 134, -0.03),
    h3: createFontStyle(1.125, 700, 142, -0.025),
  },
  body: {
    large400: createFontStyle(1, 500, 154, -0.0225),
    medium400: createFontStyle(0.875, 500, 150, -0.02),
    small400: createFontStyle(0.75, 500, 142, -0.0175),
  },
};

export const theme = {
  radius: { control: '0.5rem', card: '0.75rem', modal: '1rem', pill: '999px' },
  colors,
  fonts,
  spacing: {
    cardGap: 'clamp(0.75rem, 1.8vw, 1.5rem)',
    cardPadding: 'clamp(0.875rem, 1.6vw, 1.375rem)',
    sectionGap: 'clamp(1rem, 2.5vw, 2rem)',
  },
} as const;

export type ThemeType = typeof theme;
