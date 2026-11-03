import { useNavigate, useLocation } from 'react-router-dom';

import { BookmarkButton } from '@/components/bookmark-button';
import { Button } from '@/components/button';
import { Hashtag } from '@/components/hashtag';
import { PATHS, toBlog } from '@/constants/paths';
import type { LoadingLocationState } from '@/types/navigation';

import * as S from './ArticleCard.styles';
import type { ArticleCardProps } from './ArticleCard.types';

export default function ArticleCard({
  companyId,
  companyName,
  post,
  onBookmarkToggle,
}: ArticleCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const blogPath = toBlog(String(companyId), String(post.postId));
  const date = post.publishedAt.slice(0, 10);
  // 서버에서 AI 가이드 응답을 받아온 뒤, AI 가이드가 열린 상태로 화면을 띄움
  const loadingState: LoadingLocationState = {
    to: blogPath,
    postId: post.postId,
    forwardState: { openAiGuide: true, returnKey: location.key },
  };

  return (
    <S.Card>
      <S.TopRow>
        <S.Tags>
          <S.CompanyTag>{companyName}</S.CompanyTag>
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
        </S.Tags>
        <S.Actions>
          <Button variant="soft" onClick={() => navigate(PATHS.LOADING, { state: loadingState })}>
            AI 가이드 보기
          </Button>
          <BookmarkButton bookmarked={post.bookmarked} onClick={() => onBookmarkToggle(post)} />
        </S.Actions>
      </S.TopRow>
      <S.Date dateTime={date}>{date}</S.Date>
      <S.Title>
        <S.TitleLink to={PATHS.LOADING} state={loadingState}>
          {post.title}
        </S.TitleLink>
      </S.Title>
      <S.Summary>{post.summary}</S.Summary>
    </S.Card>
  );
}
