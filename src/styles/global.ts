import { fontFaces } from '@/styles/fonts';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    ${fontFaces}

    /* 폰트 사이즈 전체 수정을 위해 기본 루트 폰트 px 변경 18-> 16 */
    :root {
        font-size: 16px;
    }

    html, body {
        width: 100%;
        min-height: 100vh;
        background-color: ${(props) => props.theme.colors.grayScale.white};
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    #root {
        width: 100%;
        min-height: 100vh;
    }

    * {
        box-sizing: border-box;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    :is(a, button, input, select, textarea):focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.violet.vt500};
        outline-offset: 2px;
    }

    button {
        cursor: pointer;
    }
`;
