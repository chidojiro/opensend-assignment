import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { ROUTES } from './constants';
import { lazy, Suspense } from 'react';
import ProtectedRouteOutlet from './ProtectedRouteOutlet';
import HomePage from './HomePage';
import { AppLayout } from '@/features/layout/AppLayout';
import { AppLoading } from '@/features/layout/AppLoading';

const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const AdminPage = lazy(() => import('@/features/admin/AdminPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));
const OnboardingPage = lazy(() => import('@/features/onboarding/OnboardingPage'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            element={
              <Suspense fallback={<AppLoading />}>
                <Outlet />
              </Suspense>
            }
          >
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route element={<ProtectedRouteOutlet />}>
              <Route path={ROUTES.ADMIN} element={<AdminPage />} />
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
            </Route>
            {/* TODO: Add 404 page */}
            <Route path='*' element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
