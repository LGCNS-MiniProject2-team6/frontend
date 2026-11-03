import { axiosInstance } from '@/lib';

export interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  postId: number | null;
  companyId: number | null;
  originalUrl: string | null;
}

export interface NotificationPage {
  notifications: Notification[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  unreadCount: number;
}

export async function getNotifications(page = 0, signal?: AbortSignal) {
  const response = await axiosInstance.get<NotificationPage>('/api/notifications', {
    params: { page, size: 20 },
    signal,
  });
  return response.data;
}
