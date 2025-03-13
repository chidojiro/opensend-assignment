import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { ROUTES } from './constants';
import { lazy, Suspense } from 'react';
import ProtectedRouteOutlet from './ProtectedRouteOutlet';
import HomePage from './HomePage';
import { AppLayout } from '../layout/AppLayout';
import { Loader2 } from 'lucide-react';

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
              <Suspense
                fallback={
                  <div className='flex justify-center items-center mt-20 text-gray-500'>
                    <Loader2 className='animate-spin' size={48} />
                  </div>
                }
              >
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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
