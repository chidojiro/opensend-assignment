import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN_KEY, CLIENT_TOKEN_KEY } from './constants';
import { ROUTES } from '@/features/routing/constants';

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getClientToken = () => {
  return localStorage.getItem(CLIENT_TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const setClientToken = (token: string) => {
  localStorage.setItem(CLIENT_TOKEN_KEY, token);
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
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(CLIENT_TOKEN_KEY);

  window.location.href = ROUTES.LOGIN;
};
