import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/core/utils/localStorage';
import { LOCAL_STORAGE_REDUX_PERSIST_KEY } from '@/features/redux/constants';
import { ROUTES } from '@/features/routing/constants';
import { jwtDecode } from 'jwt-decode';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_CLIENT_TOKEN_KEY } from './constants';

export const getAccessToken = () => {
  return getLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
};

export const getClientToken = () => {
  return getLocalStorage(LOCAL_STORAGE_CLIENT_TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
  setLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY, token);
};

export const setClientToken = (token: string) => {
  setLocalStorage(LOCAL_STORAGE_CLIENT_TOKEN_KEY, token);
};

export const isAccessTokenValid = () => {
  const accessToken = getAccessToken();

  if (!accessToken) return false;

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || typeof decoded !== 'object') return false;

    return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
  } catch {
    return false;
  }
};

export const logout = () => {
  removeLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  removeLocalStorage(LOCAL_STORAGE_CLIENT_TOKEN_KEY);
  removeLocalStorage(LOCAL_STORAGE_REDUX_PERSIST_KEY);

  window.location.href = ROUTES.LOGIN;
};
