import { AppLayout } from '@/features/layout/AppLayout';
import { AppLoading } from '@/features/layout/AppLoading';
import { lazy, Suspense } from 'react';
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
const NotFoundPage = lazy(() => import('@/features/layout/NotFoundPage'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<AuthLayoutOutlet />}>
            <Route
              path={ROUTES.LOGIN}
              element={
                <Suspense fallback={<AppLoading />}>
                  <LoginPage />
                </Suspense>
              }
            />
          </Route>

          <Route element={<ProtectedOutlet />}>
            <Route element={<AuthorizedOutlet authorizedTypes={['ADMIN']} />}>
              <Route
                path={ROUTES.ADMIN}
                element={
                  <Suspense fallback={<AppLoading />}>
                    <AdminPage />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path={ROUTES.HOME}
              element={
                <Suspense fallback={<AppLoading />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <Suspense fallback={<AppLoading />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ONBOARDING}
              element={
                <Suspense fallback={<AppLoading />}>
                  <OnboardingPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path='*'
            element={
              <Suspense fallback={<AppLoading />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
