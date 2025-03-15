import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from './features/auth/rtkApis';
import dashboardReducer from './features/dashboard/dashboardSlice';
import widgetReducer from './features/dashboard/widgetSlice';
import { storeApi } from './features/store/rtkApis';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dashboard'],
};

const rootReducer = combineReducers({
  widgets: widgetReducer,
  dashboard: dashboardReducer,
  [authApi.reducerPath]: authApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, storeApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
