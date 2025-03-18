import { ProtectedLayout } from '@/features/layout/ProtectedLayout';
import { Outlet } from 'react-router-dom';

export const ProtectedLayoutOutlet = () => {
  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
};
