import { getLocalStorageTheme } from '@/core/utils/theme';
import { useLayoutEffect } from 'react';

export const useInjectInitialTheme = () => {
  useLayoutEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    const theme = getLocalStorageTheme() || systemTheme;

    document.documentElement.classList.add(theme);
  }, []);
};
