import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN_KEY, CLIENT_TOKEN_KEY } from './constants';
import { ROUTES } from '@/features/routing/constants';
import { getLocalStorage, setLocalStorage, clearLocalStorage } from '@/core/utils/localStorage';

export const getAccessToken = () => {
  return getLocalStorage(ACCESS_TOKEN_KEY);
};

export const getClientToken = () => {
  return getLocalStorage(CLIENT_TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
  setLocalStorage(ACCESS_TOKEN_KEY, token);
};

export const setClientToken = (token: string) => {
  setLocalStorage(CLIENT_TOKEN_KEY, token);
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
  clearLocalStorage();

  window.location.href = ROUTES.LOGIN;
};
