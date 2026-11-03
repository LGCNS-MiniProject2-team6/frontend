import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toBlog } from '@/constants/paths';
import NotificationMenu from '@/components/notification-menu/NotificationMenu';
import { getNotifications, markNotificationRead, type Notification } from '@/services/notification';
import { useAuthStore } from '@/stores/useAuthStore';

// Refresh token identifies a login session and remains stable during access-token renewal.
export default function NotificationCenter() {
  const session = useAuthStore((state) => state.refreshToken);
  return session ? <SessionNotifications key={session} /> : <NotificationMenu />;
}

function SessionNotifications() {
  const navigate = useNavigate();
  const [selecting, setSelecting] = useState(false);
  const selectingRef = useRef(false);
  const alive = useRef(true);
  const [items, setItems] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [actionError, setActionError] = useState<string>();
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
    alive.current = true;
    void load(0);
    return () => {
      alive.current = false;
      request.current?.abort();
    };
  }, [load]);

  const select = async (id: string) => {
    if (selectingRef.current) return false;
    const item = items.find((entry) => String(entry.id) === id);
    if (!item) return false;
    setActionError(undefined);
    selectingRef.current = true;
    setSelecting(true);
    request.current?.abort();
    setLoading(false);
    try {
      if (!item.isRead) await markNotificationRead(item.id);
      if (!alive.current) return false;
      setItems((previous) =>
        previous.map((entry) => (entry.id === item.id ? { ...entry, isRead: true } : entry)),
      );
      if (!item.isRead) setUnreadCount((count) => Math.max(0, count - 1));
      // Reconcile the global badge with server state, including reads on other devices.
      void load(0);
      if (item.companyId && item.postId) {
        navigate(toBlog(String(item.companyId), String(item.postId)));
        return true;
      }
      if (item.originalUrl) {
        try {
          const url = new URL(item.originalUrl);
          if (url.protocol === 'https:' || url.protocol === 'http:') {
            window.location.assign(url.href);
            return true;
          }
        } catch {
          /* Invalid original URL: keep the panel open. */
        }
      }
      setActionError('이 게시글의 이동 정보를 찾을 수 없어요.');
      return false;
    } catch {
      if (alive.current) setActionError('읽음 처리에 실패했어요. 알림을 다시 눌러 주세요.');
      return false;
    } finally {
      selectingRef.current = false;
      if (alive.current) setSelecting(false);
    }
  };

  return (
    <NotificationMenu
      items={items.map((item) => ({
        ...item,
        id: String(item.id),
        dateLabel: item.createdAt.replace('T', ' ').slice(0, 16),
      }))}
      selecting={selecting}
      onSelect={(item) => select(item.id)}
      unreadCount={unreadCount}
      loading={loading}
      error={error}
      actionError={actionError}
      onOpen={() => {
        setActionError(undefined);
        if (!selectingRef.current) void load(0);
      }}
      onRetry={() => void load(failedPage.current)}
      hasMore={page + 1 < totalPages}
      onLoadMore={() => void load(page + 1)}
    />
  );
}
