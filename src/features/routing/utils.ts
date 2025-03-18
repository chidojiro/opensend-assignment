import { store } from '@/store';
import { ROUTES } from './constants';
import { View } from '@/features/auth/types';
import { storeApi } from '@/features/store/rtkApis';
import { authApi } from '@/features/auth/rtkApis';

export const getDefaultPathname = async (view?: View) => {
  if (!view) {
    const profileResponse = await store.dispatch(authApi.endpoints.profile.initiate());

    if (!profileResponse.data) {
      return ROUTES.LOGIN;
    }

    view = profileResponse.data.view;
  }

  if (view.type === 'ADMIN') return ROUTES.ADMIN;

  const storeId = view.accesses[0]?.store_id;

  if (!storeId) {
    throw new Error('Store not found');
  }

  const storeResponse = await store.dispatch(storeApi.endpoints.store.initiate(storeId));

  if (!storeResponse.data) {
    throw new Error('Store not found');
  }

  if (storeResponse.data.store.onboarding_procedure.onboarding_status === 'DONE') {
    return ROUTES.DASHBOARD;
  }

  return ROUTES.ONBOARDING;
};
