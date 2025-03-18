import { authApi } from '@/features/auth/rtkApis';
import { isAccessTokenValid, logout } from '@/features/auth/utils';
import { ROUTES } from '@/features/routing/constants';
import { store } from '@/store';
import { getDefaultPathname } from './utils';

export type HomePageLoaderData = {
  defaultPathname: string;
};

export const homePageLoader = async (): Promise<HomePageLoaderData> => {
  if (!isAccessTokenValid()) {
    logout();

    return {
      defaultPathname: ROUTES.LOGIN,
    };
  }

  const profileResponse = await store.dispatch(authApi.endpoints.profile.initiate());

  if (!profileResponse.data) {
    logout();

    return {
      defaultPathname: ROUTES.LOGIN,
    };
  }

  const defaultPathname = await getDefaultPathname(profileResponse.data.view);

  return {
    defaultPathname,
  };
};

export const protectedLayoutLoader = async () => {

  if (!isAccessTokenValid()) {
    logout()
  }

  const profileResponse = await store.dispatch(authApi.endpoints.profile.initiate());

  if (!profileResponse.data) {
    logout();
  }

  return {}
};
