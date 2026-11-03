# 알림 연동 확인

백엔드 `develop` bfbfcc1의 Controller/DTO 기준. dev 배포 여부는 별도 확인이 필요하다.

- GET /api/notifications?page=0&size=20: notifications, page, size, totalElements, totalPages, unreadCount
- PATCH /api/notifications/{id}/read: 본문 없이 요청, 204 응답. 반복 처리 가능. 없는 알림과 다른 사용자의 알림은 NOT_FOUND
- 기존 Axios 클라이언트가 Bearer 액세스 토큰 전달. userId 헤더는 프론트에서 보내지 않고 Gateway에서 검증 후 주입
- companyId가 있으면 내부 게시글 화면으로 이동. 없으면 HTTP(S) originalUrl로 이동. 둘 다 없으면 안내 표시
- createdAt은 시간대 없는 LocalDateTime이므로 임의 시간대 변환 없이 서버 날짜·분 표시
- 헤더 진입 및 패널 열기에 목록/전체 미읽음 개수 갱신. 실시간 푸시·주기적 폴링 없음

## 수동 검증 절차

실제 환경의 로그인과 Gateway 연결 필요. 현재 터널 연결 실패로 아래 항목은 실서버 검증 전이다.

1. 로그인 후 벨 열기: GET 요청, 목록과 서버 unreadCount 확인
2. 빈 계정: 회색 “알림이 없어요” 확인
3. 알림 20개 초과 계정: 더 보기로 다음 페이지 요청, 전체 배지 유지 확인
4. Network에서 조회 요청 차단: 오류·재시도 확인. 다음 페이지 실패 시 이전 목록 유지 확인
5. 미읽음 선택: PATCH 204 이후 읽음 상태 및 재조회 배지 확인, 게시글 이동 확인
6. 읽은 항목 선택: PATCH 없이 이동 확인
7. PATCH 차단: 안내 표시, 패널 유지, 같은 항목 재클릭 가능 확인
8. PATCH 지연: 반복 클릭 시 중복 PATCH 없음 확인
9. companyId 없음: 원문 이동, 유효한 원문도 없으면 안내 표시 확인
10. 삭제된 글: 내부 게시글의 “찾을 수 없는 글이에요” 상태 확인
11. 조회 지연 중 로그아웃·다른 계정 로그인: 이전 알림 표시되지 않는지 확인
12. 모바일 패널, Escape 닫기 및 벨로 포커스 복귀 확인

## 실행한 검사

- yarn build: 통과
- yarn lint: 오류 없음, 기존 AiGuideDrawer Hook 의존성 경고 1개
- yarn lint:style: 통과
- git diff --check: 통과
- localhost:18080 조회: 연결 실패(HTTP 응답 없음)
