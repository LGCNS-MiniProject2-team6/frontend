import { useId, useRef, useState } from 'react';

import { usePanelMotion } from '@/hooks/usePanelMotion';

import * as S from './NotificationMenu.styles';

export interface NotificationItem {
  id: string;
  title: string;
  dateLabel: string;
  isRead: boolean;
}

interface NotificationMenuProps {
  items?: NotificationItem[];
  loading?: boolean;
  error?: string;
  actionError?: string;
  unreadCount?: number;
  onOpen?: () => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onRetry?: () => void;
  selecting?: boolean;
  onSelect?: (item: NotificationItem) => Promise<boolean>;
}

export default function NotificationMenu({
  items = [],
  loading = false,
  error,
  actionError,
  onRetry,
  onSelect,
  selecting = false,
  unreadCount = items.filter((item) => !item.isRead).length,
  onOpen,
  hasMore,
  onLoadMore,
}: NotificationMenuProps) {
  const motion = usePanelMotion('right');
  const close = () => void motion.close(() => dialog.current?.close());
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  return (
    <>
      <S.Trigger
        ref={trigger}
        type="button"
        aria-label={unreadCount ? `알림, 읽지 않은 알림 ${unreadCount}개` : '알림'}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          dialog.current?.showModal();
          motion.enter();
          setOpen(true);
          onOpen?.();
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
        </svg>
        {unreadCount > 0 && (
          <S.Badge aria-hidden="true">{unreadCount > 99 ? '99+' : unreadCount}</S.Badge>
        )}
      </S.Trigger>
      <S.Dialog
        ref={(element) => {
          dialog.current = element;
          motion.panel.current = element;
          motion.surface.current = element;
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          ) {
            close();
          }
        }}
      >
        <S.Heading>
          <S.Title id={titleId}>알림</S.Title>
          <S.Trigger type="button" aria-label="알림 닫기" onClick={close}>
            <span aria-hidden="true">×</span>
          </S.Trigger>
        </S.Heading>
        <S.Body aria-busy={loading}>
          {actionError && <S.Message role="alert">{actionError}</S.Message>}
          {loading && <S.Message role="status">알림을 불러오고 있어요</S.Message>}
          {error && (
            <S.Error>
              <S.Message role="alert">{error}</S.Message>
              <S.Retry type="button" disabled={loading || selecting} onClick={onRetry}>
                다시 시도
              </S.Retry>
            </S.Error>
          )}
          {items.length === 0 ? (
            !loading && !error && <S.Message role="status">알림이 없어요</S.Message>
          ) : (
            <S.List>
              {items.map((item) => (
                <li key={item.id}>
                  <S.Item
                    type="button"
                    $unread={!item.isRead}
                    disabled={selecting}
                    onClick={async () => {
                      if (onSelect && (await onSelect(item))) close();
                    }}
                  >
                    {!item.isRead && <S.Unread>읽지 않음</S.Unread>}
                    <S.ItemTitle>{item.title}</S.ItemTitle>
                    <S.DateLabel>{item.dateLabel}</S.DateLabel>
                  </S.Item>
                </li>
              ))}
            </S.List>
          )}
          {hasMore && (
            <S.Retry type="button" disabled={loading || selecting} onClick={onLoadMore}>
              더 보기
            </S.Retry>
          )}
        </S.Body>
      </S.Dialog>
    </>
  );
}
