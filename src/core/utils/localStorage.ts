export const setLocalStorage = (key: string, value: string) => {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
};

export const getLocalStorage = (key: string, parse?: boolean) => {
  try {
    const value = localStorage.getItem(key);

    if (!parse) return value;

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn(`Error getting localStorage key "${key}":`, error);
    localStorage.removeItem(key);
    return null;
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.warn('Error clearing localStorage:', error);
  }
};
