import { useCallback, useEffect, useState } from 'react';

import { StateNotice } from '@/components';
import { ProfileForm } from '@/features/profile';
import { toast, type ApiError } from '@/lib';
import { getProfile, updateProfile } from '@/services/profile';
import { getTechTags } from '@/services/techTags';
import type { ProfileRequest, ProfileResponse, TechTag } from '@/types/profile';

import * as S from './MyPage.styles';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; profile: ProfileResponse; techTags: TechTag[] };

// 마이페이지 (F8). 내 정보 · 기술 목록 조회와 저장 모두 서버를 쓴다.
export default function MyPage() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    Promise.all([getProfile(), getTechTags()])
      .then(([profile, techTags]) => setState({ status: 'done', profile, techTags }))
      .catch((error: ApiError) => setState({ status: 'error', message: error.message }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (request: ProfileRequest) => {
    await updateProfile(request);
    toast.success('내 정보를 저장했어요', { id: 'profile-saved' });
  };

  const renderContent = () => {
    if (state.status === 'loading')
      return <StateNotice tone="loading" title="내 정보를 불러오고 있어요" bare />;

    if (state.status === 'error')
      return (
        <StateNotice
          tone="error"
          title="내 정보를 불러오지 못했어요"
          description={state.message}
          action={{ label: '다시 시도', onClick: load }}
        />
      );

    const { profile, techTags } = state;
    return (
      <ProfileForm
        variant="settings"
        name={profile.name}
        techTags={techTags}
        initialValues={{
          jobFields: profile.jobFields,
          careerYears: profile.careerYears,
          haveSkillIds: profile.haveSkills.map((skill) => skill.techTagId),
          wantSkillIds: profile.wantSkills.map((skill) => skill.techTagId),
        }}
        submitLabel="저장"
        onSubmit={handleSubmit}
      />
    );
  };

  return (
    <S.Container>
      <S.Title>내 정보</S.Title>
      <S.Description>바꾸면 기업 추천 순서와 AI 가이드가 다시 계산됩니다</S.Description>
      {renderContent()}
    </S.Container>
  );
}
