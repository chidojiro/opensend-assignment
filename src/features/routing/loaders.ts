import { authApi } from '@/features/auth/rtkApis';
import { isAccessTokenValid, logout } from '@/features/auth/utils';
import { ROUTES } from '@/features/routing/constants';
import { store } from '@/store';
import { getDefaultPathname } from './utils';
import { redirect } from 'react-router-dom';

export type HomePageLoaderData = {
  defaultPathname: string;
};

export const homePageLoader = async (): Promise<HomePageLoaderData> => {
  let defaultPathname: string;

  if (!isAccessTokenValid()) {
    defaultPathname = ROUTES.LOGIN;
  } else {
    defaultPathname = await getDefaultPathname();
  }

  if (defaultPathname === ROUTES.LOGIN) {
    logout();
  }

  return {
    defaultPathname,
  };
};

export const authLayoutLoader = async () => {
  if (isAccessTokenValid()) {
    const defaultPathname = await getDefaultPathname();

    return redirect(defaultPathname);
  }

  return {};
};

export const protectedLayoutLoader = async () => {
  if (!isAccessTokenValid()) {
    logout();
    return {};
  }

  const profileResponse = await store.dispatch(authApi.endpoints.profile.initiate());

  if (!profileResponse.data) {
    logout();
    return {};
  }

  return {};
};
