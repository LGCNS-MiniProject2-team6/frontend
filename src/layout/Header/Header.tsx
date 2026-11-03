import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import NotificationCenter from '@/features/notification/NotificationCenter';

import { WarningModal } from '@/components';
import { PATHS } from '@/constants/paths';
import { logout } from '@/services/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import * as S from './Header.styles';

const MENU_ITEMS = [
  { label: '기업 목록', path: PATHS.HOME },
  { label: '북마크', path: PATHS.FAV },
];

export default function Header() {
  const mobileMenu = useRef<HTMLDialogElement>(null);
  const profileMenu = useRef<HTMLDetailsElement>(null);
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clear);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // 서버에 refresh 토큰 폐기를 요청한 뒤 저장한 토큰을 지운다.
  // 서버 요청이 실패해도(네트워크 · 토큰 불일치) 이 기기에서는 로그아웃시킨다.
  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    const { refreshToken } = useAuthStore.getState();
    try {
      if (refreshToken) await logout(refreshToken);
    } catch {
      // 실패해도 아래에서 로그아웃 처리
    } finally {
      clearAuth();
      navigate(PATHS.LOGIN, { replace: true });
    }
  };

  const navigation = MENU_ITEMS.map(({ label, path }) => (
    <NavLink key={path} to={path} onClick={() => mobileMenu.current?.close()}>
      {label}
    </NavLink>
  ));

  return (
    <S.Header>
      <S.Start>
        <S.MobileMenuButton
          type="button"
          aria-label="메뉴 열기"
          aria-haspopup="dialog"
          onClick={() => mobileMenu.current?.showModal()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </S.MobileMenuButton>
        <S.Brand to={PATHS.HOME}>ReCu</S.Brand>
        <S.DesktopNav aria-label="주 메뉴">{navigation}</S.DesktopNav>
      </S.Start>
      <S.Actions>
        <NotificationCenter />
        <S.Profile
          ref={profileMenu}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && event.currentTarget.open) {
              event.currentTarget.open = false;
              event.currentTarget.querySelector('summary')?.focus();
            }
          }}
        >
          <S.ProfileTrigger>프로필</S.ProfileTrigger>
          <S.ProfilePanel>
            <NavLink
              to={PATHS.MY_PAGE}
              onClick={() => {
                if (profileMenu.current) profileMenu.current.open = false;
              }}
            >
              마이페이지
            </NavLink>
            <button
              type="button"
              onClick={() => {
                if (profileMenu.current) profileMenu.current.open = false;
                setShowLogoutModal(true);
              }}
            >
              로그아웃
            </button>
          </S.ProfilePanel>
        </S.Profile>
      </S.Actions>
      <S.MobileMenu
        ref={mobileMenu}
        aria-label="주 메뉴"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <S.MobilePanel>
          <S.IconButton
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => mobileMenu.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </S.IconButton>
          <S.Nav aria-label="주 메뉴">{navigation}</S.Nav>
        </S.MobilePanel>
      </S.MobileMenu>
      {showLogoutModal && (
        <WarningModal
          title="로그아웃 하시겠어요?"
          description="다시 로그인해야 이용할 수 있어요."
          confirmLabel="로그아웃"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          confirmLoading={loggingOut}
        />
      )}
    </S.Header>
  );
}
