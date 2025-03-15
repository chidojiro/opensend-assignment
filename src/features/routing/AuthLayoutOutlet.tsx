import { Navigate, Outlet } from 'react-router';
import { isAccessTokenValid } from '../auth/utils';
import { ROUTES } from './constants';
import { AuthLayout } from '@/features/layout/AuthLayout';

export const AuthLayoutOutlet = () => {
  if (isAccessTokenValid()) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};
