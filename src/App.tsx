import LoginPage from '@/features/auth/LoginPage';
import { AppLayout } from '@/features/layout/AppLayout';
import { store } from '@/store';
import { Provider } from 'react-redux';

export const App = () => {
  return (
    <Provider store={store}>
      <AppLayout>
        <LoginPage />
      </AppLayout>
    </Provider>
  );
};
