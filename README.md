# ReCu Frontend

> 개발자가 관심 기술에 맞는 기업 기술 블로그를 찾고, AI 가이드와 북마크·새 글 알림으로 학습을 이어갈 수 있는 웹 화면입니다.

React 기반 기존 ReCu 화면을 MSA 백엔드와 연결한 프론트엔드 저장소입니다. Google 로그인부터 프로필·기업·게시글·AI 가이드·알림까지 하나의 흐름으로 제공하고, 배포 시 nginx가 정적 화면과 Gateway API 프록시를 담당합니다.

- 프로젝트 상태: MSA API·알림 연동 및 dev/prod 배포 보고 반영
- 서비스: [ReCu](https://recu.kro.kr)
- 문서: [개발 가이드](CONTRIBUTING.md) · [알림 연동 확인](docs/notification-integration.md)
- 문서 기준일: 2026-11-04, 소스 설명은 `develop` 기준

## 주요 기능

| 기능 | 사용자에게 제공하는 결과 |
| --- | --- |
| Google 로그인 | 소셜 로그인 후 토큰 보관·만료 시 재발급, 보호 화면 진입 |
| 프로필·관심 기술 | 경력·직무·보유 기술·관심 기술 입력 및 수정 |
| 기업·게시글 탐색 | 추천 기업·기업 상세·글 목록·본문·목차 확인 |
| AI 읽기 가이드 | 게시글별 개인화 가이드 요청 및 본문 구간별 읽기 안내 |
| 북마크 | 관심 글 저장·해제·목록 조회 |
| 알림함 | 새 글 알림·전체 미읽음 수·추가 목록 조회, 읽음 처리 후 게시글 이동 |

알림은 로그인 세션 진입과 알림함을 열 때 서버에서 조회합니다. 현재 브라우저의 실시간 푸시·주기적 폴링은 사용하지 않습니다.

## 빠른 시작

### 사전 준비

| 항목 | 필요한 버전·조건 |
| --- | --- |
| Node.js | 24 — 현재 CI·Docker 빌드와 동일한 기준 |
| 패키지 관리자 | Yarn Classic 1.22.22, 저장소 `yarn.lock` 사용 |
| Backend | 로컬 Gateway `http://localhost:8080`, 관련 업무 서비스·DB·Config·Eureka |
| Google OAuth | 웹 클라이언트 ID, 실행할 Origin과 콜백 URI 등록 |

### 설치 및 설정

```bash
git clone -b develop https://github.com/LGCNS-MiniProject2-team6/frontend.git
cd frontend
yarn install --frozen-lockfile
```

로컬 설정 파일 `.env.local`에 다음 값을 작성합니다.

```dotenv
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=발급받은_Google_OAuth_클라이언트_ID
```

| 설정 이름 | 용도 | 적용 시점 |
| --- | --- | --- |
| `VITE_API_BASE_URL` | 브라우저 API 주소·Vite 개발 프록시 대상 | 개발 서버 시작·정적 파일 빌드 시점 |
| `VITE_GOOGLE_CLIENT_ID` | Google 로그인 공개 클라이언트 ID | 개발 서버 시작·정적 파일 빌드 시점 |
| `API_UPSTREAM` | 배포 nginx가 연결하는 Gateway | 컨테이너 시작 시점, 기본 `http://api-gateway:8080` |

Google OAuth에는 로컬 Origin `http://localhost:5173`과 리디렉션 URI `http://localhost:5173/google/callback`을 등록합니다. 운영은 `https://recu.kro.kr`과 해당 도메인의 `/google/callback`을 사용하며, Backend의 Google 클라이언트 검증·Gateway CORS 설정도 함께 맞춥니다.

`VITE_*` 값은 브라우저 코드에 포함됩니다. 클라이언트 ID 이외의 비밀번호·API 비밀 키·내부 토큰을 넣지 않습니다. `.env.local`은 커밋하지 않습니다.

### 실행

```bash
yarn dev --port 5173 --strictPort
```

- 접속 주소: `http://localhost:5173`
- 정상 실행 확인: 로그인 후 프로필·기업 목록을 조회하고 브라우저 Network에서 Gateway 요청 확인
- 종료 방법: 개발 서버 터미널에서 `Ctrl+C`

설정 변경 후 개발 서버를 재시작합니다. 다른 포트로 실행하면 Google OAuth·Gateway Origin 설정도 해당 주소와 일치해야 합니다. 백엔드 준비는 [Backend README](https://github.com/LGCNS-MiniProject2-team6/backend#빠른-시작)를 참고합니다.

## 사용 예시

1. Google 계정으로 로그인합니다. 신규 사용자는 프로필과 관심 기술을 입력합니다.
2. 추천 기업과 글 목록에서 글을 열어 본문·목차를 확인합니다.
3. AI 가이드를 요청해 읽을 구간을 확인하고 관심 글을 북마크합니다.
4. 관심 조건에 맞는 새 글이 수집된 뒤 알림함을 열면 새 알림과 미읽음 수를 확인할 수 있습니다.
5. 알림을 선택하면 읽음 처리 후 게시글로 이동합니다. 내부 게시글 정보가 없는 알림은 유효한 HTTP(S) 원문 주소로 이동합니다.

## 기술 구성

| 영역 | 기술 | 사용하는 목적 |
| --- | --- | --- |
| 화면 | React 19, TypeScript 5.7 | 컴포넌트·타입 기반 SPA |
| 개발·빌드 | Vite 6, Yarn Classic | 개발 서버·타입 검사·정적 파일 빌드 |
| 라우팅·상태 | React Router 7, Zustand 5 | 페이지 이동·로그인 상태 |
| API | Axios | Bearer 토큰 전달·재발급·오류 처리 |
| 스타일 | styled-components 6, Pretendard | 테마·공용 스타일·서체 |
| 품질 검사 | ESLint, Stylelint, Prettier, Husky, commitlint | 코드·스타일·커밋 규칙 |
| 배포 | Node.js 24 빌드, nginx unprivileged, GHCR | 정적 이미지·비루트 실행·API 프록시 |

```text
브라우저 → HTTPS Ingress → frontend nginx
  ├─ 화면: 정적 파일·SPA 라우팅
  └─ /api/: API Gateway → User / Blog / AI
```

프론트는 사용자 JWT를 전달하고 사용자 ID는 Gateway가 검증·주입합니다. 공통 Axios 인터셉터가 토큰 만료 시 재발급을 한 번 공유하고 원 요청을 재시도하며, 실패하면 로그인 화면으로 이동합니다.

| 경로 | 책임 |
| --- | --- |
| `src/pages/`, `src/layout/` | 페이지·라우팅 레이아웃·보호 경로 |
| `src/features/`, `src/components/` | 도메인 UI·알림 연동·공용 컴포넌트 |
| `src/services/`, `src/lib/` | API 함수·Axios·Google OAuth |
| `src/stores/`, `src/types/` | 전역 상태·응답 타입 |
| `src/styles/`, `src/assets/`, `public/` | 테마·아이콘·정적 리소스 |
| `nginx/`, `Dockerfile`, `.github/workflows/` | 컨테이너 프록시·이미지·CI |

## 테스트 및 빌드

```bash
yarn build
yarn lint
yarn lint:style
yarn preview
```

- `build`: TypeScript 검사 후 `dist/` 정적 파일 생성
- `lint`·`lint:style`: 코드·스타일 검사
- `preview`: 빌드된 화면 미리보기. 배포 nginx의 API 프록시를 대체하지 않음
- 현재 `package.json`에 별도의 자동 테스트 명령은 없습니다. 로그인·재발급·알림·읽음 처리 등은 [수동 확인 절차](docs/notification-integration.md)를 사용합니다.

알림 연동 문서에는 빌드·ESLint·Stylelint 통과와 기존 Hook 의존성 경고 1개가 기록되어 있습니다. 해당 기록은 이번 README 작성에서 새로 수행한 검사가 아닙니다.

## 배포 및 운영

### 이미지 빌드

Google 클라이언트 ID를 셸 환경변수에 준비한 뒤 실행합니다.

```bash
docker build --platform linux/amd64 --build-arg VITE_GOOGLE_CLIENT_ID="$VITE_GOOGLE_CLIENT_ID" -t recu-frontend:local .
```

Dockerfile은 정적 파일을 빌드하고 nginx의 `8080` 포트로 제공합니다. 배포 이미지의 `VITE_API_BASE_URL` 기본값은 빈 문자열이므로 브라우저는 같은 출처의 `/api/`로 요청하고 nginx가 Gateway로 전달합니다. `API_UPSTREAM`은 실행 환경에서 바꿀 수 있지만 Google 클라이언트 ID 등 빌드값 변경에는 재빌드가 필요합니다.

### CI와 GitOps

- [Frontend CI](.github/workflows/frontend-ci.yml): `develop`·`main` 대상 PR에서 빌드·ESLint·Stylelint 검사
- [Frontend Image](.github/workflows/frontend-image.yml): `develop` push 및 수동 실행에서 `linux/amd64` 이미지를 GHCR에 업로드. 지정된 컨테이너 관련 경로의 PR에서는 빌드만 수행
- 이미지: `ghcr.io/lgcns-miniproject2-team6/recu-frontend:<전체 소스 SHA>`
- Actions Variable `VITE_GOOGLE_CLIENT_ID` 필요. GHCR 업로드에는 `GITHUB_TOKEN` 사용
- 현재 frontend 이미지 워크플로에는 GitOps PR 자동 생성 단계가 없습니다. 업로드 후 [GitOps frontend 선언](https://github.com/LGCNS-MiniProject2-team6/recu-gitops/tree/main/overlays)의 이미지 주소를 PR로 변경합니다.
- dev는 GitOps `main` 병합 후 자동 Sync, prod는 dev에서 검증한 동일 이미지로 승격 후 수동 Sync합니다.
- 비공개 GHCR 이미지는 각 Namespace의 `ghcr-pull` Secret을 참조합니다.

배포 보고에는 prod HTTPS·Google 로그인·기업 목록/상세·게시글 조회 성공이 기록되어 있습니다. 현재 서비스 가용성과 전체 UI 시나리오는 이번 문서 작업에서 재검증하지 않았습니다.

## 문제 해결

| 증상 | 확인할 내용 | 조치 |
| --- | --- | --- |
| Google 로그인 차단 | 브라우저 Origin·콜백 URI·클라이언트 ID | Google 등록값과 실행 주소, Backend 검증 설정을 일치시킴 |
| API 연결 실패 | 로컬 API 주소 또는 nginx `API_UPSTREAM`·Gateway 상태 | 로컬은 Gateway 8080, 배포는 동일 Namespace Service DNS 확인 |
| 상세 주소 새로고침 시 404 | 정적 서버의 SPA fallback | 배포 nginx의 `try_files … /index.html` 설정 유지 |
| 컨테이너 환경변수 변경 후 화면값 유지 | Vite 빌드 시점 값인지 | `VITE_*` 변경은 다시 빌드. `API_UPSTREAM`만 런타임 설정 |
| 알림이 즉시 나타나지 않음 | User 이벤트 처리·알림함 조회 시점 | 수집·저장·Consumer 처리 확인 후 알림함 다시 열기 |
| AI 가이드 요청 시간 초과 | AI·Gemini 응답·프록시 제한 | 현재 가이드 호출은 60초, nginx 읽기는 130초. 각 구간의 로그를 함께 확인 |
| 배포 이미지 pull 실패 | GHCR 접근 권한·`ghcr-pull` | 해당 Namespace의 pull Secret과 Deployment 참조 확인 |

문의는 팀 `frontend-issue` 포럼에 화면·재현 절차·비밀값을 제거한 Network 오류를 남깁니다.

## 문서 및 협업

| 문서·저장소 | 내용 |
| --- | --- |
| [Backend](https://github.com/LGCNS-MiniProject2-team6/backend) | 업무 API·Gateway·로컬 인프라 |
| [Config](https://github.com/LGCNS-MiniProject2-team6/recu-config) | Gateway 라우팅·환경별 Origin |
| [GitOps](https://github.com/LGCNS-MiniProject2-team6/recu-gitops) | frontend Deployment·Service·Ingress·이미지 |
| [API 원천 안내](https://github.com/LGCNS-MiniProject2-team6/backend/blob/develop/docs/api.md) | 팀 Notion API 명세서 위치 |
| [알림 연동 확인](docs/notification-integration.md) | 구현 동작·오류·수동 검증 항목 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 폴더·스타일·브랜치·커밋·PR 규칙 |

화면·디자인 토큰은 팀 Figma `Design` 페이지를 기준으로 합니다. 변경은 `develop` 대상 PR로 검토하고 `main`·`develop`에 직접 push하지 않습니다. 기존 개발 가이드의 모놀리스 주소·초기 폴더 설명보다 이 README의 MSA 실행 주소와 현재 소스를 우선 확인합니다.

## 팀 및 문의

| 작업 영역 | 담당자 | 담당 내용 |
| --- | --- | --- |
| 프론트엔드 화면·알림·PR CI | [윤현일(@yhi9839)](https://github.com/yhi9839) | 기존 화면의 MSA API 연결·반응형 개선, 알림 목록·읽음·이동, 빌드·린트 PR 검사 |
| Backend — User·알림 | [한예림(@woomoo3)](https://github.com/woomoo3) · [윤현일(@yhi9839)](https://github.com/yhi9839) | 각각 인증·프로필·북마크·Kafka 알림 생성과 알림 조회·읽음 처리 API |
| Backend — Blog | [김우진(@Kimoojin)](https://github.com/Kimoojin) | 기업·게시글·태그·수집 기능 및 서비스 간 조회 계약 |
| Backend — AI·Gateway 인증 | [박재후(@pdpdpdjjj23)](https://github.com/pdpdpdjjj23) | AI 가이드·내부 API, Gateway JWT 검증·사용자 ID 전달 |
| MSA 플랫폼 | [윤현일(@yhi9839)](https://github.com/yhi9839) | Gateway 라우팅·CORS·Config·서비스 연결 |
| 프론트 컨테이너·이미지 CI | [현준혁(@HYH0804)](https://github.com/HYH0804) | Docker·nginx 정적 이미지·GHCR 업로드 CI·dev 배포 연결 |
| K3s·GitOps 배포 | [문한일(@Unpart)](https://github.com/Unpart) | dev/prod 배포·Registry Secret·Ingress·TLS·공개 도메인 운영 |

담당 계정은 frontend와 연동 저장소의 병합 PR·커밋 이력 기준입니다. 표는 작업 영역 기준이며, 기존 화면 개발과 이번 MSA 연동·배포 작업을 구분합니다.

## 라이선스

저장소에 라이선스 파일이 확인되지 않았습니다. 사용·재배포 조건은 팀에 문의하고 공개 배포 전에 확정합니다.
