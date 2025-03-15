import { isAccessTokenValid } from '@/features/auth/utils';
import { ProtectedLayout } from '@/features/layout/ProtectedLayout';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from './constants';

export const ProtectedOutlet = () => {
  if (!isAccessTokenValid()) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
};
