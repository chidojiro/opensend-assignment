import { getLocalStorage, setLocalStorage } from './localStorage';

export const toggleDarkMode = () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = nextTheme;

  setLocalStorage('theme', nextTheme);
};

export const getLocalStorageTheme = () => {
  return getLocalStorage('theme');
};
