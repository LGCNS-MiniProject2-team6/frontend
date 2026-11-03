import styled from 'styled-components';

// Figma /{:companyID} (node 167:1303) 의 오른쪽 영역. 길이는 Figma px ÷ 16 으로 rem 환산.
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sectionGap};
  padding: 1.625rem 1.75rem;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8125rem;
`;

export const InfoCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;
  padding: 1.375rem 1.625rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.violet.vt000};
  box-shadow: 0 3px 16px 0 rgb(0 0 0 / 6%);
`;

export const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.75rem;
  overflow: hidden;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.grayScale.gy100};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Name = styled.h1`
  ${({ theme }) => theme.fonts.header.h3};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

// 한 줄 소개와 주요 사업 사이의 가운뎃점 양옆 공백을 시안처럼 넓게 두려고 pre-wrap 을 쓴다.
export const Intro = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy500};
  white-space: pre-wrap;
`;

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.colors.violet.vt200};
`;

export const StatList = styled.dl`
  display: flex;
  flex-direction: column;
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
`;

export const StatIconBox = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const StatLabel = styled.dt`
  ${({ theme }) => theme.fonts.body.small400};
  flex-shrink: 0;
  width: 6.5rem;
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;

export const StatValue = styled.dd`
  ${({ theme }) => theme.fonts.body.medium400};
  flex: 1;
  min-width: 0;
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: pre-wrap;

  a:hover {
    text-decoration: underline;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ToggleLabel = styled.span`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const ToggleCount = styled.span`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;

export const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.cardGap};
`;

// 빈 상태 · 없는 기업 안내. 시안이 없어 카드 모양만 맞춘 임시 디자인이다.
export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2.5rem 1.375rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: 0.75rem;
  text-align: center;
`;

export const NoticeTitle = styled.p`
  ${({ theme }) => theme.fonts.body.large400};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const NoticeDescription = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;
