import { isAccessTokenValid } from '@/features/auth/utils';
import { Navigate } from 'react-router';
import { ROUTES } from './constants';

export default function HomePage() {
  if (isAccessTokenValid()) {
    return <Navigate to={ROUTES.ADMIN} />;
  }

  return null;
}
