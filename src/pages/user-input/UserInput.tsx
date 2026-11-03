import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GradientCard, StateNotice } from '@/components';
import { PATHS } from '@/constants/paths';
import { ProfileForm } from '@/features/profile';
import { toast, type ApiError } from '@/lib';
import { createProfile } from '@/services/profile';
import { getTechTags } from '@/services/techTags';
import type { LoadingLocationState } from '@/types/navigation';
import type { ProfileRequest, TechTag } from '@/types/profile';

import * as S from './UserInput.styles';

type TechTagsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; techTags: TechTag[] };

// 기본정보 입력 (F3). 기술 목록 · 저장 모두 서버를 쓴다.
export default function UserInput() {
  const navigate = useNavigate();
  const [state, setState] = useState<TechTagsState>({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    getTechTags()
      .then((techTags) => setState({ status: 'done', techTags }))
      .catch((error: ApiError) => setState({ status: 'error', message: error.message }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (request: ProfileRequest) => {
    try {
      await createProfile(request);
      toast.success('내 정보를 저장했어요', { id: 'profile-saved' });
    } catch (error) {
      // 이미 저장한 사용자(뒤로 가기로 돌아왔거나 다른 탭에서 저장한 경우)는 막지 않고 목록으로 보낸다
      if ((error as ApiError).code !== 'PROFILE_ALREADY_EXISTS') throw error;
      toast((error as ApiError).message, { id: 'profile-already-exists' });
    }
    const state: LoadingLocationState = { variant: 'companyList' };
    navigate(PATHS.LOADING, { replace: true, state });
  };

  const renderForm = () => {
    if (state.status === 'loading')
      return <StateNotice tone="loading" title="기술 목록을 불러오고 있어요" bare />;

    if (state.status === 'error')
      return (
        <StateNotice
          tone="error"
          title="기술 목록을 불러오지 못했어요"
          description={state.message}
          action={{ label: '다시 시도', onClick: load }}
        />
      );

    return (
      <ProfileForm
        techTags={state.techTags}
        submitLabel="저장하고 시작하기"
        onSubmit={handleSubmit}
      />
    );
  };

  return (
    <GradientCard>
      <S.Content>
        <S.Sigil aria-hidden />
        <S.Title>내 정보 입력</S.Title>
        <S.Description>
          맞춤 큐레이션을 위해 사용자님의 정보가 필요해요! 지금 작성한 내용은 이후
          &lt;마이페이지&gt;를 통해 수정할 수 있어요
        </S.Description>
        {renderForm()}
      </S.Content>
    </GradientCard>
  );
}
