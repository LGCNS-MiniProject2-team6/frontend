import { useCallback, useEffect, useState } from 'react';

import TocRow from '@/components/TocRow/TocRow';
import { StateNotice } from '@/components/state-notice';
import type { ApiError } from '@/lib';
import { generateGuide } from '@/services/guide';
import type { GuideResponse } from '@/types/guide';
import type { PostSection } from '@/types/post';

import { usePanelMotion } from '@/hooks/usePanelMotion';

import * as S from './AiGuideDrawer.styles';

type AiGuideDrawerProps = {
  postId: number;
  sections: PostSection[];
  onClose: () => void;
  // 본문 소제목도 강조해야 해서 focusSections 를 부모(Blog)로 보냄
  onFocusSections?: (focusSections: number[]) => void;
};

type GuideState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; data: GuideResponse };

const CARD_TITLES = ['어디서 부터 읽어야 할까?', '나에게 맞는 읽기 순서는?', '다음 공부는 이렇게!'];

export default function AiGuideDrawer({
  postId,
  sections,
  onClose,
  onFocusSections,
}: AiGuideDrawerProps) {
  const motion = usePanelMotion('right');
  const { enter, close: animateClose } = motion;
  useEffect(() => {
    enter();
  }, [enter]);
  const close = () => void animateClose(onClose);
  const [guideState, setGuideState] = useState<GuideState>({ status: 'loading' });

  const loadGuide = useCallback(() => {
    setGuideState({ status: 'loading' });
    generateGuide(postId)
      .then((data) => {
        setGuideState({ status: 'done', data });
        onFocusSections?.(data.focusSections);
      })
      .catch((error: ApiError) => setGuideState({ status: 'error', message: error.message }));
  }, [postId, onFocusSections]);

  useEffect(() => {
    loadGuide();
    // 드로어를 닫아도 본문 강조는 남겨두도록 함 (드로어 창을 닫으면 강조 표시가 사라지는 문제 해결)
  }, [loadGuide]);

  // 드로어가 떠 있는 동안 뒤쪽 페이지가 스크롤/클릭되지 않게 막는다.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleTocClick = (seq: number) => {
    document.getElementById(`section-${seq}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const focusSet = new Set(guideState.status === 'done' ? guideState.data.focusSections : []);
  const badgeBySeq = new Map(
    guideState.status === 'done'
      ? guideState.data.sectionBadges.map(({ seq, badge }) => [seq, badge])
      : [],
  );
  const cardTexts =
    guideState.status === 'done'
      ? [guideState.data.section1Text, guideState.data.section2Text, guideState.data.section3Text]
      : [];

  return (
    <>
      <S.Overlay
        ref={motion.backdrop as React.RefObject<HTMLButtonElement>}
        type="button"
        onClick={close}
        aria-label="AI 가이드 닫기"
      />
      <S.Drawer ref={motion.panel as React.RefObject<HTMLDivElement>}>
        <S.ScrollArea>
          <S.Header>
            <S.Title>AI 읽기 가이드</S.Title>
            <S.CloseButton type="button" onClick={close} aria-label="AI 가이드 닫기">
              <S.CloseIconGlyph />
            </S.CloseButton>
          </S.Header>

          <S.ResultArea>
            {guideState.status === 'loading' && (
              <StateNotice tone="loading" title="AI 가이드를 만들고 있어요" bare />
            )}
            {guideState.status === 'error' && (
              <StateNotice
                tone="error"
                title="AI 가이드를 불러오지 못했어요"
                description={guideState.message}
                action={{ label: '다시 시도', onClick: loadGuide }}
              />
            )}
            {guideState.status === 'done' && (
              <S.Card>
                {CARD_TITLES.map((title, index) => (
                  <S.CardSection key={title}>
                    <S.CardSectionTitle>{title}</S.CardSectionTitle>
                    <S.CardSectionBody>{cardTexts[index]}</S.CardSectionBody>
                  </S.CardSection>
                ))}
              </S.Card>
            )}
          </S.ResultArea>
          <S.TocLabel>목차</S.TocLabel>
          <S.TocList>
            {sections.map((section) => (
              <TocRow
                key={section.seq}
                order={section.seq}
                title={section.heading}
                highlighted={focusSet.has(section.seq)}
                badge={badgeBySeq.get(section.seq)}
                onClick={() => handleTocClick(section.seq)}
              />
            ))}
          </S.TocList>
        </S.ScrollArea>
      </S.Drawer>
    </>
  );
}
