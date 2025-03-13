import LoginPage from '@/features/auth/LoginPage';
import { AppLayout } from './features/layout/AppLayout';

export const App = () => {
  return (
    <AppLayout>
      <LoginPage />
    </AppLayout>
  );
};
