export const localStorage = {
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  },

  get(key: string) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn(`Error getting localStorage key "${key}":`, error);
      window.localStorage.removeItem(key);
      return null;
    }
  },

  remove(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear() {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
  },
};
