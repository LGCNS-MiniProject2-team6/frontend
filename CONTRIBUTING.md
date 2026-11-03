# 개발 가이드

## 0. 시작하기

```bash
yarn install     # 패키지 설치 (husky 훅도 자동 설정됨)
yarn dev         # 개발 서버 (http://localhost:8080)
yarn build       # 프로덕션 빌드 (tsc -b && vite build)
yarn preview     # 빌드 결과 미리보기
```

`.env.local`에 API 서버 주소를 설정합니다 (커밋 금지, `.gitignore`에 이미 포함됨).
```
VITE_API_BASE_URL=http://localhost:8000
```

---

## 1. 폴더 구조

```
src/
├── main.tsx              # 진입점 — 라우터, ThemeProvider, GlobalStyle 등록
├── vite-env.d.ts          # vite/svgr 타입 참조
├── pages/                 # 라우트 단위 화면 (도메인별 하위 폴더)
│   ├── index.ts           # 페이지 배럴(barrel) export
│   └── main/Main.tsx, Main.styles.ts
├── features/               # 도메인 로직 (컴포넌트 + 상태 + API 묶음)
│   └── <도메인>/components, stores, libs ...
├── components/              # 여러 화면에서 재사용하는 공용 UI
├── layout/                  # 전역 레이아웃 (Layout.tsx가 <Outlet/>으로 페이지를 감쌈)
├── stores/                  # 전역 zustand 스토어
├── services/                 # 외부 API 연동 로직 (axiosInstance 사용)
├── lib/                      # axios 인스턴스 등 공용 라이브러리 래퍼
├── hooks/, utils/, constants/  # 공용 훅 / 유틸 함수 / 상수
├── types/                     # 전역 타입 선언 (styled-components.d.ts 등)
├── styles/                    # theme.ts, global.ts, fonts.ts
└── assets/                    # 이미지, 아이콘 등 정적 리소스
```

새 폴더(`components`, `features`, `stores`, `services` 등)는 현재 비어 있고 `.gitkeep`만 있습니다. 첫 파일을 추가하면 `.gitkeep`은 지워도 됩니다.

---

## 2. 네이밍 컨벤션

- 컴포넌트: `PascalCase.tsx` + 스타일은 `PascalCase.styles.ts`로 분리
- 폴더: `kebab-case` (예: `components/nav-bar`), 도메인 폴더는 단수 `camelCase`
- 전역 스토어: `useXxxStore.ts`
- 폴더마다 `index.ts`로 public export만 노출 (배럴 패턴)
- 경로는 상대경로 대신 `@/*` 별칭 사용 (`@/styles/theme` 등 → `src/*`에 매핑)

---

## 3. 스타일링 (styled-components)

- `src/styles/theme.ts`: Figma variables 기준 `colors`(violet/grayScale), `fonts`(header/body) 정의
- `src/styles/global.ts`: `styled-reset` + Pretendard `fontFaces` + 데스크탑 기준 전역 스타일
- 컴포넌트에서 테마 값 사용:
  ```tsx
  export const Title = styled.h1`
    ${({ theme }) => theme.fonts.header.h2};
    color: ${({ theme }) => theme.colors.grayScale.black};
  `;
  ```
- 새 색상/타이포그래피가 필요하면 **Figma variables를 먼저 확인**하고 `theme.ts`에 추가 (임의 값 추가 금지)

---

## 4. 라우팅 페이지 추가하기

1. `src/pages/<도메인>/PageName.tsx` + `PageName.styles.ts` 생성
2. `src/pages/index.ts`에 export 추가
3. `src/main.tsx`의 `routes` 배열 `children`에 경로 추가

```tsx
{
  path: 'booth',
  element: <Booth />,
}
```

---

## 5. API 통신

`src/lib/AxiosInstance.ts`의 `axiosInstance`를 사용합니다. 도메인별 API 함수는 `src/services/<도메인>/`에 작성하세요.

```ts
import { axiosInstance } from '@/lib';

export const getBooths = () => axiosInstance.get('/booths');
```

---

## 6. 상태관리

전역 상태는 zustand로 `src/stores/useXxxStore.ts`에, 특정 도메인에만 쓰이는 상태는 `src/features/<도메인>/stores/`에 작성합니다.

---

## 7. Lint / Format / Git Hook

- `yarn lint` — ESLint
- `yarn lint:style` / `yarn lint:style:fix` — styled-components 문법 대상 Stylelint
- 저장 시 자동 포맷은 에디터의 Prettier 연동을 권장 (`.prettierrc` 참고)
- **pre-commit**: `lint-staged`가 변경된 `.ts/.tsx` 파일에 eslint --fix, prettier, stylelint --fix를 자동 실행
- **commit-msg**: `commitlint`가 Conventional Commits 형식을 강제

커밋과 PR 제목은 `type(scope): 설명` 형식을 사용합니다.
유형은 `feat` / `fix` / `docs` / `style` / `refactor` / `chore` / `test`를 사용합니다.
설명 끝에 마침표를 붙이지 않습니다. 임시 커밋은 PR 전에 정리합니다.

## 8. 브랜치 / PR / 이슈

- `main`은 제출·발표용, `develop`은 통합용입니다. 두 브랜치에는 직접 push하지 않습니다.
- 팀 원격(`origin`)의 최신 `develop`을 기준으로 `feat/*`, `fix/*`, `chore/*` 등 작업 브랜치를 만들고 `develop`으로 PR을 엽니다.
- `main` PR은 같은 저장소의 `develop`에서 올립니다. `check-main-source` 워크플로가 출처를 검사합니다.
- 리뷰 승인 1명 이상을 받은 뒤 병합합니다.
- PR 본문은 `수정사항` / `스크린샷` / `메모`로 구성합니다. 변경 한 덩어리당 한 줄로 쓰고, 스크린샷이 없으면 해당 절을 생략합니다.
- 버그와 기능 이슈는 `.github/ISSUE_TEMPLATE/`의 양식을 사용합니다.
