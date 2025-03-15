export const toggleDarkMode = () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = nextTheme;

  localStorage.setItem('theme', nextTheme);
};
