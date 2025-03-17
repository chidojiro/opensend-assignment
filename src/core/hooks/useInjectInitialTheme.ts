import { getLocalStorageTheme } from '@/core/utils/theme';
import { useLayoutEffect } from 'react';

export const useInjectInitialTheme = () => {
  useLayoutEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : undefined;

    const theme = getLocalStorageTheme() || systemTheme;

    if (theme === 'dark') {
      document.documentElement.dataset.theme = 'dark';
    }
  }, []);
};
