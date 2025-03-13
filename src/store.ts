import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/rtkApis';
import { storeApi } from './features/store/rtkApis';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, storeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
