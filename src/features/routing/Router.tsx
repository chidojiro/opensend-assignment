import { AppLayout } from '@/features/layout/AppLayout';
import NotFoundPage from '@/features/layout/NotFoundPage';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthLayoutOutlet } from './AuthLayoutOutlet';
import { AuthorizedOutlet } from './AuthorizedOutlet';
import { ROUTES } from './constants';
import { ProtectedOutlet } from './ProtectedOutlet';

const HomePage = lazy(() => import('./HomePage'));
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const AdminPage = lazy(() => import('@/features/admin/AdminPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));
const OnboardingPage = lazy(() => import('@/features/onboarding/OnboardingPage'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<AuthLayoutOutlet />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          </Route>

          <Route element={<ProtectedOutlet />}>
            <Route element={<AuthorizedOutlet authorizedTypes={['ADMIN']} />}>
              <Route path={ROUTES.ADMIN} element={<AdminPage />} />
            </Route>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
