import { useHistoryScroll } from '@/hooks/useHistoryScroll';
import { Outlet } from 'react-router-dom';
import * as S from './Layout.styles';

export default function Layout() {
  useHistoryScroll();
  return (
    <S.Container>
      <Outlet />
    </S.Container>
  );
}
