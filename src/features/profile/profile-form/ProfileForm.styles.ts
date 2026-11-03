import styled, { css } from 'styled-components';

import { subtleInteraction } from '@/styles/interaction';

import { Button } from '@/components';

import type { ProfileFormVariant } from './ProfileForm.types';

// Figma /userInput - 2안 (node 278:3001) 의 입력 영역. settings 는 /myPage (node 150:896)
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

export const CareerInput = styled.input`
  width: 12.5rem;
  padding: 0.6875rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: ${({ theme }) => theme.radius.control};
  outline: none;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gy700};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.violet.vt500};
  }
`;

export const AddButton = styled.button`
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};

  ${subtleInteraction};
`;

// 오류 전용 색 변수가 아직 없어서 주 색(vt500)으로 표시한다
export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.violet.vt500};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

// ---- settings (/myPage) ----

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.0625rem;
  padding: 1.625rem 1.875rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background-color: ${({ theme }) => theme.colors.violet.vt000};
  box-shadow: 0 3px 16px 0 rgb(0 0 0 / 6%);
`;

export const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

export const NameField = styled(Field)`
  width: 15rem;
`;

// 이름은 구글 계정 이름이라 고칠 수 없다. 경력 입력칸과 같은 모양의 상자로만 보여 준다
export const ReadOnlyBox = styled.p`
  padding: 0.6875rem 0.75rem;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.control};
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const settingsStyle = css`
  gap: 1rem;

  ${Row} ${Field} {
    gap: 0.375rem;
  }

  ${Label} {
    color: ${({ theme }) => theme.colors.grayScale.gy700};
  }

  ${CareerInput} {
    width: 10rem;
    border-color: transparent;

    &:focus {
      border-color: ${({ theme }) => theme.colors.violet.vt500};
    }
  }
`;

export const Form = styled.form<{ $variant: ProfileFormVariant }>`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;

  ${({ $variant }) => $variant === 'settings' && settingsStyle};
`;
