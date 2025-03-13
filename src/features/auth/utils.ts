import { jwtDecode } from "jwt-decode";

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
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