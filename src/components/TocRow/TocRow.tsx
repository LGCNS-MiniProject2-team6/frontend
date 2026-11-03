import * as S from './TocRow.styles';

type TocRowProps = {
  order: number;
  title: string;
  highlighted?: boolean;
  // AI 가이드 sectionBadges(KEY · LIGHT · SKIP · REF). 값이 없으면 배지를 안 그린다
  badge?: string;
  onClick?: () => void;
};

// 화면 표시 문구. 명세에 없는 값이 오면 배지 없이 원문 코드를 그대로 보여 준다
const BADGE_LABELS: Record<string, string> = {
  KEY: '핵심',
  LIGHT: '가볍게',
  SKIP: '건너뛰기',
  REF: '참고',
};

export default function TocRow({ order, title, highlighted = false, badge, onClick }: TocRowProps) {
  return (
    <S.Row type="button" $highlighted={highlighted} onClick={onClick}>
      <S.AccentBar $highlighted={highlighted} />
      <S.Order>{String(order).padStart(2, '0')}</S.Order>
      <S.Title $highlighted={highlighted}>{title}</S.Title>
      {highlighted && <S.Dot />}
      {badge && <S.Badge $badge={badge}>{BADGE_LABELS[badge] ?? badge}</S.Badge>}
    </S.Row>
  );
}
