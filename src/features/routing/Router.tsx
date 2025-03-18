import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayoutOutlet } from './AppLayoutOutlet';
import { AuthLayoutOutlet } from './AuthLayoutOutlet';
import { ROUTES } from './constants';
import {
  authLayoutLoader,
  authorizedLayoutLoader,
  homePageLoader,
  protectedLayoutLoader,
} from './loaders';
import { ProtectedLayoutOutlet } from './ProtectedLayoutOutlet';

const HomePage = lazy(() => import('./HomePage'));
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const AdminPage = lazy(() => import('@/features/admin/AdminPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));
const OnboardingPage = lazy(() => import('@/features/onboarding/OnboardingPage'));
const ErrorPage = lazy(() => import('@/features/layout/ErrorPage'));
const NotFoundPage = lazy(() => import('@/features/layout/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayoutOutlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthLayoutOutlet />,
        loader: authLayoutLoader,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <ProtectedLayoutOutlet />,
        loader: protectedLayoutLoader,
        children: [
          {
            path: ROUTES.ADMIN,
            loader: authorizedLayoutLoader(['ADMIN']),
            element: <AdminPage />,
          },
          {
            path: ROUTES.HOME,
            index: true,
            element: <HomePage />,
            loader: homePageLoader,
          },
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.ONBOARDING,
            element: <OnboardingPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
