import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styles/global';
import { theme } from '@/styles/theme';
import {
  Blog,
  Company,
  Fav,
  GoogleCallback,
  Home,
  Landing,
  Loading,
  Login,
  MyPage,
  UserInput,
} from '@/pages';
import Layout, { ProtectedRoute, SidebarLayout } from '@/layout';
import { toasterProps } from '@/lib';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={'/landing'} replace />,
      },
      {
        path: 'landing',
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'google/callback',
        element: <GoogleCallback />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <SidebarLayout />,
            children: [
              {
                path: 'home',
                element: <Home />,
              },
              {
                path: 'fav',
                element: <Fav />,
              },
              {
                path: 'myPage',
                element: <MyPage />,
              },
              {
                path: ':companyId',
                element: <Company />,
              },
            ],
          },
          {
            path: 'userInput',
            element: <UserInput />,
          },
          {
            path: 'loading',
            element: <Loading />,
          },
          {
            path: ':companyId/:blogId',
            element: <Blog />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={routes} />
      <Toaster {...toasterProps} />
    </ThemeProvider>
  </>,
);
