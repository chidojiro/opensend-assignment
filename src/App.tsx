import { store } from '@/store';
import { Provider } from 'react-redux';
import { Router } from '@/features/routing/Router';

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
