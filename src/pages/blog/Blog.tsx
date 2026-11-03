import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AiGuideDrawer, BookmarkButton, Button, Hashtag, StateNotice } from '@/components';
import { PATHS } from '@/constants/paths';
import { showErrorToast, toast, type ApiError } from '@/lib';
import { addBookmark, removeBookmark } from '@/services/bookmark';
import { getPostDetail } from '@/services/post';
import { theme } from '@/styles/theme';
import type { PostDetail } from '@/types/post';

import * as S from './Blog.styles';

type DetailState =
  | { status: 'loading' }
  | { status: 'notFound' }
  | { status: 'error'; message: string }
  | { status: 'done'; post: PostDetail };

// 한 달(30일)이 넘어가면 "N일 전" 대신 "N달 전"을 보여주도록 수정
const RELATIVE_DAYS_LIMIT = 30;

const formatRelativeDate = (dateStr: string) => {
  const diffDays = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
  if (diffDays <= 0) return '오늘';
  if (diffDays <= RELATIVE_DAYS_LIMIT) return `${diffDays}일 전`;
  return `${Math.floor(diffDays / 30)}달 전`;
};

// 글 상세 · AI 가이드 (05)
export default function Blog() {
  const navigate = useNavigate();
  const location = useLocation();
  const { blogId } = useParams();
  const postId = Number(blogId);

  const openAiGuide = Boolean((location.state as { openAiGuide?: boolean } | null)?.openAiGuide);
  const [isAiGuideOpen, setIsAiGuideOpen] = useState(openAiGuide);
  // 본문 소제목도 강조해야 해서 드로어가 알려주는 focusSections 유지
  const [focusSections, setFocusSections] = useState<number[]>([]);

  const [detailState, setDetailState] = useState<DetailState>({ status: 'loading' });
  const [bookmarked, setBookmarked] = useState(false);
  const pendingBookmark = useRef(false);

  const loadDetail = useCallback(() => {
    setDetailState({ status: 'loading' });
    getPostDetail(postId)
      .then((post) => {
        setDetailState({ status: 'done', post });
        setBookmarked(post.bookmarked);
      })
      .catch((error: ApiError) =>
        setDetailState(
          error.code === 'NOT_FOUND'
            ? { status: 'notFound' }
            : { status: 'error', message: error.message },
        ),
      );
  }, [postId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const handleBookmarkToggle = async () => {
    if (pendingBookmark.current) return;
    pendingBookmark.current = true;

    const next = !bookmarked;
    setBookmarked(next);
    try {
      await (next ? addBookmark(postId) : removeBookmark(postId));
    } catch (error) {
      const { code } = error as ApiError;
      const alreadyDone = next ? code === 'ALREADY_BOOKMARKED' : code === 'NOT_FOUND';
      if (!alreadyDone) {
        setBookmarked(!next);
        showErrorToast(error as ApiError);
        return;
      }
    } finally {
      pendingBookmark.current = false;
    }
    toast.success(next ? '북마크에 저장했어요' : '북마크에서 삭제했어요', {
      id: 'bookmark-feedback',
    });
  };

  const highlightStyle = useMemo(() => {
    if (focusSections.length === 0) return '';
    const headings = focusSections.map((seq) => `#section-${seq}`).join(', ');
    const markers = focusSections.map((seq) => `#section-${seq}::after`).join(', ');
    // 강조 목차 표시용 별 태그 추가
    const markerSvg = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 0.8125L7.9625 4.55L11.7812 5.0375L8.9375 7.6375L9.66875 11.375L6.5 9.425L3.33125 11.375L4.0625 7.6375L1.21875 5.0375L5.0375 4.55L6.5 0.8125Z" fill="${theme.colors.violet.vt700}"/></svg>`;
    const markerUrl = `data:image/svg+xml,${encodeURIComponent(markerSvg)}`;
    return `
      ${headings} {
        display: inline-block;
        color: ${theme.colors.violet.vt500};
        background-color: ${theme.colors.violet.vt100};
        padding: 0.25rem 0.625rem;
        border-radius: 0.375rem;
      }
      ${markers} {
        content: '';
        display: inline-block;
        width: 0.8125rem;
        height: 0.8125rem;
        margin-left: 0.5rem;
        background-image: url("${markerUrl}");
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
      }
    `;
  }, [focusSections]);

  if (detailState.status === 'loading') {
    return (
      <S.Container>
        <StateNotice tone="loading" title="글을 불러오고 있어요" bare />
      </S.Container>
    );
  }

  if (detailState.status === 'notFound') {
    return (
      <S.Container>
        <S.Notice>
          <S.NoticeTitle>찾을 수 없는 글이에요</S.NoticeTitle>
          <S.NoticeDescription>주소가 바뀌었거나 목록에서 빠진 글일 수 있어요.</S.NoticeDescription>
          <Button variant="soft" onClick={() => navigate(PATHS.HOME)}>
            기업 목록으로
          </Button>
        </S.Notice>
      </S.Container>
    );
  }

  if (detailState.status === 'error') {
    return (
      <S.Container>
        <StateNotice
          tone="error"
          title="글을 불러오지 못했어요"
          description={detailState.message}
          action={{ label: '다시 시도', onClick: loadDetail }}
        />
      </S.Container>
    );
  }

  const { post } = detailState;

  return (
    <S.Container>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <S.BackIcon />
        </S.BackButton>
        <S.TitleBlock>
          <S.MetaRow>
            <S.Date>{post.publishedAt}</S.Date>
            <S.RelativeDate>{formatRelativeDate(post.publishedAt)}</S.RelativeDate>
            {post.categories.map((category) => (
              <Hashtag key={`category-${category}`} variant="category">
                {category}
              </Hashtag>
            ))}
            {post.skills.map((skill) => (
              <Hashtag key={`skill-${skill}`} variant="tech">
                {skill}
              </Hashtag>
            ))}
          </S.MetaRow>
          <S.TitleRow>
            <S.Title>{post.title}</S.Title>
            <S.TitleSpacer />
            <S.IconButton
              href={post.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="원문 보기"
            >
              <S.ExternalLinkIconGlyph />
            </S.IconButton>
            <BookmarkButton bookmarked={bookmarked} onClick={handleBookmarkToggle} />
          </S.TitleRow>
        </S.TitleBlock>
      </S.Header>

      <S.Body>
        <S.OriginalArea>
          {highlightStyle && <style>{highlightStyle}</style>}
          <S.Content dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </S.OriginalArea>
      </S.Body>

      {isAiGuideOpen ? (
        <AiGuideDrawer
          postId={postId}
          sections={post.sections}
          onFocusSections={setFocusSections}
          onClose={() => setIsAiGuideOpen(false)}
        />
      ) : (
        <S.AiGuideToggle
          type="button"
          aria-label="AI 가이드 열기"
          onClick={() => setIsAiGuideOpen(true)}
        >
          <S.AiGuideToggleIcon />
        </S.AiGuideToggle>
      )}
    </S.Container>
  );
}
