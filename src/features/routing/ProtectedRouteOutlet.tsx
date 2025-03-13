import { isAccessTokenValid } from '@/features/auth/utils';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from './constants';

export default function ProtectedRouteOutlet() {
  if (!isAccessTokenValid()) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}
