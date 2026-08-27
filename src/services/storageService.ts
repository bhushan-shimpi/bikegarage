const STORAGE_KEYS = {
  ENQUIRIES: 'chaudhari_auto_enquiries',
  APPOINTMENTS: 'chaudhari_auto_appointments',
  AUTH_TOKEN: 'cac_auth_token',
  CURRENT_USER: 'cac_current_user',
};

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing localStorage key "${key}":`, e);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing localStorage key "${key}":`, e);
    }
  },

  keys: STORAGE_KEYS,
};

export const storageService = storage;
