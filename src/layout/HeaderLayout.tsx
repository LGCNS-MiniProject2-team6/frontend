import { Outlet } from 'react-router-dom';

import Header from '@/layout/Header/Header';
import * as S from './HeaderLayout.styles';

// 콘텐츠 화면이 공유하는 헤더 레이아웃.
export default function HeaderLayout() {
  return (
    <S.Container>
      <Header />
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
}
