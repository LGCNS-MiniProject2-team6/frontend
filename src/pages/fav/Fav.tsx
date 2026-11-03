import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArticleCard, StateNotice } from '@/components';
import type { ArticleCardPost } from '@/components';
import { PATHS } from '@/constants/paths';
import { showErrorToast, toast, type ApiError } from '@/lib';
import { getBookmarks, removeBookmark } from '@/services/bookmark';
import type { BookmarkItem } from '@/types/bookmark';

import * as S from './Fav.styles';

type BookmarksState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; items: BookmarkItem[] };

// 북마크 목록 (F6)
export default function Fav() {
  const navigate = useNavigate();
  const [state, setState] = useState<BookmarksState>({ status: 'loading' });
  // 같은 글의 해제 요청이 겹치지 않게 진행 중인 글 번호 보관
  const pendingRemovals = useRef(new Set<number>());

  const loadBookmarks = useCallback(() => {
    setState({ status: 'loading' });
    getBookmarks()
      .then(({ bookmarks }) => setState({ status: 'done', items: bookmarks }))
      .catch((error: ApiError) => setState({ status: 'error', message: error.message }));
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  // 404 성공, 이외 토스트 알림 처리
  const handleBookmarkToggle = async (post: ArticleCardPost) => {
    const { postId } = post;
    if (pendingRemovals.current.has(postId)) return;
    pendingRemovals.current.add(postId);

    let removed: BookmarkItem | undefined;
    setState((prev) => {
      if (prev.status !== 'done') return prev;
      removed = prev.items.find((item) => item.postId === postId);
      return { status: 'done', items: prev.items.filter((item) => item.postId !== postId) };
    });

    try {
      await removeBookmark(postId);
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.code !== 'NOT_FOUND') {
        setState((prev) =>
          prev.status === 'done' && removed
            ? { status: 'done', items: [removed, ...prev.items] }
            : prev,
        );
        showErrorToast(apiError);
        return;
      }
    } finally {
      pendingRemovals.current.delete(postId);
    }
    toast.success('북마크에서 삭제했어요', { id: 'bookmark-feedback' });
  };

  if (state.status === 'loading') {
    return (
      <S.Container>
        <S.Title>북마크</S.Title>
        <StateNotice tone="loading" title="북마크 목록을 불러오고 있어요" bare />
      </S.Container>
    );
  }

  if (state.status === 'error') {
    return (
      <S.Container>
        <S.Title>북마크</S.Title>
        <StateNotice
          tone="error"
          title="북마크 목록을 불러오지 못했어요"
          description={state.message}
          action={{ label: '다시 시도', onClick: loadBookmarks }}
        />
      </S.Container>
    );
  }

  const { items } = state;

  return (
    <S.Container>
      <S.Title>북마크</S.Title>
      {items.length > 0 ? (
        <>
          <S.Subtitle>최근 저장 순 · {items.length}편</S.Subtitle>
          <S.List>
            {items.map((item) => (
              <li key={item.postId}>
                <ArticleCard
                  companyId={item.companyId}
                  companyName={item.companyName}
                  post={{ ...item, bookmarked: true }}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              </li>
            ))}
          </S.List>
        </>
      ) : (
        <StateNotice
          tone="empty"
          title="아직 저장한 글이 없어요"
          description="기업 블로그 글에서 북마크를 눌러 여기에 모아 볼 수 있어요."
          action={{ label: '기업 목록으로', onClick: () => navigate(PATHS.HOME) }}
        />
      )}
    </S.Container>
  );
}
