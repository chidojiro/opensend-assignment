import { AppLayout } from '@/features/layout/AppLayout';
import { Outlet } from 'react-router';

export const AppLayoutOutlet = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
