import { useCallback, useEffect, useRef, useState } from 'react';
import NotificationMenu from '@/components/notification-menu/NotificationMenu';
import { getNotifications, type Notification } from '@/services/notification';
import { useAuthStore } from '@/stores/useAuthStore';

// Refresh token identifies a login session and remains stable during access-token renewal.
export default function NotificationCenter() {
  const session = useAuthStore((state) => state.refreshToken);
  return session ? <SessionNotifications key={session} /> : <NotificationMenu />;
}

function SessionNotifications() {
  const [items, setItems] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const failedPage = useRef(0);
  const request = useRef<AbortController | null>(null);

  const load = useCallback(async (nextPage: number) => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError(undefined);
    failedPage.current = nextPage;
    try {
      const result = await getNotifications(nextPage, controller.signal);
      if (controller.signal.aborted) return;
      setItems((previous) =>
        nextPage === 0
          ? result.notifications
          : [
              ...previous,
              ...result.notifications.filter((item) => !previous.some((old) => old.id === item.id)),
            ],
      );
      setUnreadCount(result.unreadCount);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch {
      if (!controller.signal.aborted) setError('알림을 불러오지 못했어요. 다시 시도해 주세요.');
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(0);
    return () => request.current?.abort();
  }, [load]);

  return (
    <NotificationMenu
      items={items.map((item) => ({
        ...item,
        id: String(item.id),
        dateLabel: item.createdAt.replace('T', ' ').slice(0, 16),
      }))}
      unreadCount={unreadCount}
      loading={loading}
      error={error}
      onOpen={() => void load(0)}
      onRetry={() => void load(failedPage.current)}
      hasMore={page + 1 < totalPages}
      onLoadMore={() => void load(page + 1)}
    />
  );
}
