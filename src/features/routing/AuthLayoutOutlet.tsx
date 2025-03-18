import { AuthLayout } from '@/features/layout/AuthLayout';
import { Outlet } from 'react-router-dom';

export const AuthLayoutOutlet = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};
