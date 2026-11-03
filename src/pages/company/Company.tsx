import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StatBlogIcon from '@/assets/icons/stat-blog.svg?react';
import StatSkillIcon from '@/assets/icons/stat-skill.svg?react';
import StatSourceIcon from '@/assets/icons/stat-source.svg?react';
import StatTopicIcon from '@/assets/icons/stat-topic.svg?react';
import { ArticleCard, BackButton, Button, Dropdown, StateNotice, Toggle } from '@/components';
import type { ArticleCardPost, DropdownOption } from '@/components';
import { PATHS } from '@/constants/paths';
import { showErrorToast, toast, type ApiError } from '@/lib';
import { addBookmark, removeBookmark } from '@/services/bookmark';
import { getCompanyDetail, getCompanyPosts } from '@/services/company';
import type { CompanyDetail, CompanyPostsResponse, NameCount } from '@/types/company';

import * as S from './Company.styles';

type SortOrder = 'relevance' | 'latest';

type DetailState =
  | { status: 'loading' }
  | { status: 'notFound' }
  | { status: 'error'; message: string }
  | { status: 'done'; company: CompanyDetail };

type PostsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; data: CompanyPostsResponse };

// 관련도순 = 서버가 준 순서(관심 기술 겹침 수 → 최신순) 그대로
const SORT_OPTIONS: DropdownOption<SortOrder>[] = [
  { value: 'relevance', label: '관련도순' },
  { value: 'latest', label: '최신순' },
];

const formatCounts = (items: NameCount[]) =>
  items.map(({ name, count }) => `${name} ${count}`).join(' · ');

// 기업 상세 (F5). 상단 기업 정보 · 글 카드 목록 · 북마크 모두 서버를 쓴다.
export default function Company() {
  const navigate = useNavigate();
  const { companyId: companyIdParam } = useParams();
  const companyId = Number(companyIdParam);

  // 티켓: 「내 관심 기술만」 토글 기본 ON
  const [onlyMySkills, setOnlyMySkills] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>('relevance');
  // 서버 응답을 다시 받기 전까지 저장 버튼 결과를 화면에 먼저 반영한다.
  const [bookmarkOverrides, setBookmarkOverrides] = useState<Record<number, boolean>>({});

  const [postsState, setPostsState] = useState<PostsState>({ status: 'loading' });
  // 토글을 바꿔 다시 받는 동안에도 「N편」이 사라지지 않게 마지막으로 받은 수를 둔다
  const [matchedCount, setMatchedCount] = useState<number | null>(null);

  const [detailState, setDetailState] = useState<DetailState>({ status: 'loading' });
  // 같은 글의 북마크 요청이 겹치지 않게 진행 중인 글 번호를 둔다
  const pendingBookmarks = useRef(new Set<number>());

  const loadDetail = useCallback(() => {
    setDetailState({ status: 'loading' });
    getCompanyDetail(companyId)
      .then((company) => setDetailState({ status: 'done', company }))
      .catch((error: ApiError) =>
        setDetailState(
          error.code === 'NOT_FOUND'
            ? { status: 'notFound' }
            : { status: 'error', message: error.message },
        ),
      );
  }, [companyId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const company = detailState.status === 'done' ? detailState.company : null;

  const loadPosts = useCallback(() => {
    setPostsState({ status: 'loading' });
    getCompanyPosts(companyId, onlyMySkills)
      .then((data) => {
        setPostsState({ status: 'done', data });
        setMatchedCount(data.filter.matchedCount);
      })
      .catch((error: ApiError) => setPostsState({ status: 'error', message: error.message }));
  }, [companyId, onlyMySkills]);

  useEffect(() => {
    if (company) loadPosts();
  }, [company, loadPosts]);

  const posts = useMemo(
    () => (postsState.status === 'done' ? postsState.data.posts : []),
    [postsState],
  );

  const sortedPosts = useMemo(
    () =>
      sortOrder === 'latest'
        ? [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        : posts,
    [posts, sortOrder],
  );

  // 버튼을 먼저 바꾸고 서버에 저장한다. 이미 원하는 상태(저장 409 · 해제 404)면 성공으로 보고,
  // 그 밖의 실패는 버튼을 되돌리고 토스트로 알린다.
  const handleBookmarkToggle = async (post: ArticleCardPost) => {
    const { postId } = post;
    if (pendingBookmarks.current.has(postId)) return;
    pendingBookmarks.current.add(postId);

    const next = !post.bookmarked;
    setBookmarkOverrides((prev) => ({ ...prev, [postId]: next }));
    try {
      await (next ? addBookmark(postId) : removeBookmark(postId));
    } catch (error) {
      const { code } = error as ApiError;
      const alreadyDone = next ? code === 'ALREADY_BOOKMARKED' : code === 'NOT_FOUND';
      if (!alreadyDone) {
        setBookmarkOverrides((prev) => ({ ...prev, [postId]: !next }));
        showErrorToast(error as ApiError);
        return;
      }
    } finally {
      pendingBookmarks.current.delete(postId);
    }
    toast.success(next ? '북마크에 저장했어요' : '북마크에서 삭제했어요', {
      id: 'bookmark-feedback',
    });
  };

  if (detailState.status === 'loading')
    return (
      <S.Container>
        <StateNotice tone="loading" title="기업 정보를 불러오고 있어요" bare />
      </S.Container>
    );

  if (detailState.status === 'error')
    return (
      <S.Container>
        <StateNotice
          tone="error"
          title="기업 정보를 불러오지 못했어요"
          description={detailState.message}
          action={{ label: '다시 시도', onClick: loadDetail }}
        />
      </S.Container>
    );

  if (!company) {
    return (
      <S.Container>
        <S.Notice>
          <S.NoticeTitle>찾을 수 없는 기업이에요</S.NoticeTitle>
          <S.NoticeDescription>
            주소가 바뀌었거나 목록에서 빠진 기업일 수 있어요.
          </S.NoticeDescription>
          <Button variant="soft" onClick={() => navigate(PATHS.HOME)}>
            기업 목록으로
          </Button>
        </S.Notice>
      </S.Container>
    );
  }

  const { name, logoUrl, summary, mainBusiness, sourceUrl, checkedAt, stats } = company;
  const intro = [summary, mainBusiness].filter(Boolean).join('   ·   ');
  const source = [
    sourceUrl && (
      <a key="url" href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {sourceUrl.replace(/^https?:\/\//, '')}
      </a>
    ),
    checkedAt && `${checkedAt} 확인`,
  ].filter(Boolean);

  return (
    <S.Container>
      <S.Top>
        <BackButton />
        <S.InfoCard>
          <S.CompanyHeader>
            {/* 로고가 없는 기업(logoUrl null)은 회색 빈 칸으로 둔다 */}
            <S.Logo>{logoUrl && <img src={logoUrl} alt={`${name} 로고`} />}</S.Logo>
            <S.NameBlock>
              <S.Name>{name}</S.Name>
              {intro && <S.Intro>{intro}</S.Intro>}
            </S.NameBlock>
          </S.CompanyHeader>
          <S.Divider />
          <S.StatList>
            <S.StatRow>
              <S.StatIconBox>
                <StatTopicIcon aria-hidden />
              </S.StatIconBox>
              <S.StatLabel>주로 다루는 주제</S.StatLabel>
              <S.StatValue>{formatCounts(stats.topCategories)}</S.StatValue>
            </S.StatRow>
            <S.StatRow>
              <S.StatIconBox>
                <StatSkillIcon aria-hidden />
              </S.StatIconBox>
              <S.StatLabel>자주 나오는 기술</S.StatLabel>
              <S.StatValue>{formatCounts(stats.topSkills)}</S.StatValue>
            </S.StatRow>
            <S.StatRow>
              <S.StatIconBox>
                <StatBlogIcon aria-hidden />
              </S.StatIconBox>
              <S.StatLabel>블로그</S.StatLabel>
              <S.StatValue>
                {stats.postCount}편 · {stats.firstPublishedAt} ~ {stats.lastPublishedAt}
              </S.StatValue>
            </S.StatRow>
            {source.length > 0 && (
              <S.StatRow>
                <S.StatIconBox>
                  <StatSourceIcon aria-hidden />
                </S.StatIconBox>
                <S.StatLabel>출처 · 확인일</S.StatLabel>
                <S.StatValue>
                  {source.map((item, index) => (
                    <span key={index}>
                      {index > 0 && '  ·  '}
                      {item}
                    </span>
                  ))}
                </S.StatValue>
              </S.StatRow>
            )}
          </S.StatList>
        </S.InfoCard>
      </S.Top>

      <S.Controls>
        <S.ToggleGroup>
          <S.ToggleLabel id="only-my-skills-label">내 관심 기술만</S.ToggleLabel>
          {matchedCount !== null && <S.ToggleCount>{matchedCount}편</S.ToggleCount>}
          <Toggle
            checked={onlyMySkills}
            onChange={setOnlyMySkills}
            aria-labelledby="only-my-skills-label"
          />
        </S.ToggleGroup>
        <Dropdown
          options={SORT_OPTIONS}
          value={sortOrder}
          onChange={setSortOrder}
          aria-label="정렬"
        />
      </S.Controls>

      {postsState.status === 'loading' ? (
        <StateNotice tone="loading" title="글 목록을 불러오고 있어요" bare />
      ) : postsState.status === 'error' ? (
        <StateNotice
          tone="error"
          title="글 목록을 불러오지 못했어요"
          description={postsState.message}
          action={{ label: '다시 시도', onClick: loadPosts }}
        />
      ) : sortedPosts.length > 0 ? (
        <S.PostList>
          {sortedPosts.map((post) => (
            <li key={post.postId}>
              <ArticleCard
                companyId={companyId}
                companyName={name}
                post={{ ...post, bookmarked: bookmarkOverrides[post.postId] ?? post.bookmarked }}
                onBookmarkToggle={handleBookmarkToggle}
              />
            </li>
          ))}
        </S.PostList>
      ) : onlyMySkills && postsState.data.filter.totalCount > 0 ? (
        // 명세: 관심 기술 글이 0편이면 서버는 빈 목록을 주고, 화면이 전체 글 보기를 안내한다.
        <S.Notice>
          <S.NoticeTitle>이 기업에는 관심 기술을 다룬 글이 아직 없어요</S.NoticeTitle>
          <S.NoticeDescription>
            토글을 끄면 이 기업의 전체 글 {postsState.data.filter.totalCount}편을 최신순으로 볼 수
            있어요.
          </S.NoticeDescription>
          <Button variant="soft" onClick={() => setOnlyMySkills(false)}>
            전체 글 보기
          </Button>
        </S.Notice>
      ) : (
        <S.Notice>
          <S.NoticeTitle>아직 수집된 글이 없어요</S.NoticeTitle>
        </S.Notice>
      )}
    </S.Container>
  );
}
