import { getLocalStorage, setLocalStorage } from './localStorage';
import { LOCAL_STORAGE_THEME_KEY } from '@/core/constants/theme';

export const toggleDarkMode = () => {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  document.documentElement.classList.toggle(currentTheme);

  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.add(nextTheme);

  setLocalStorage(LOCAL_STORAGE_THEME_KEY, nextTheme);
};

export const getLocalStorageTheme = () => {
  return getLocalStorage(LOCAL_STORAGE_THEME_KEY);
};
