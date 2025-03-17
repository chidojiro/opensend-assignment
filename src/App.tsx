import { useInjectInitialTheme } from '@/core/hooks/useInjectInitialTheme';
import { Router } from '@/features/routing/Router';
import { persistor, store } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export const App = () => {
  useInjectInitialTheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};
