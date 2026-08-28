import { AdminUser } from '../types/auth';
import { storage } from './storageService';

const DEFAULT_ADMIN: AdminUser = {
  id: 'usr-1',
  username: 'admin',
  name: 'Bhushan Chaudhari',
  role: 'superadmin',
  garageLocation: 'Pahur, Maharashtra',
};

export const authService = {
  login: (usernameOrMobile: string, password: string): { success: boolean; user?: AdminUser; error?: string } => {
    const cleanUser = usernameOrMobile.trim().toLowerCase();
    const cleanPass = password.trim();

    // Flexible mock credentials acceptance for smooth testing
    const validUsernames = ['admin', '7387448878', '9503853143', 'chaudhari', 'garage'];
    const validPasswords = ['admin', 'admin123', 'garage1994', '123456', 'chaudhari1994'];

    if (
      (validUsernames.includes(cleanUser) || cleanUser.length >= 4) &&
      (validPasswords.includes(cleanPass) || cleanPass.length >= 4)
    ) {
      const user: AdminUser = {
        ...DEFAULT_ADMIN,
        username: cleanUser,
      };
      storage.set(storage.keys.AUTH_TOKEN, 'mock-jwt-cac-token-1994');
      storage.set(storage.keys.CURRENT_USER, user);
      return { success: true, user };
    }

    return {
      success: false,
      error: 'Invalid credentials. Use "admin" and "admin123" (or mobile 7387448878) to login.',
    };
  },

  getCurrentUser: (): AdminUser | null => {
    return storage.get<AdminUser | null>(storage.keys.CURRENT_USER, null);
  },

  isAuthenticated: (): boolean => {
    const token = storage.get<string | null>(storage.keys.AUTH_TOKEN, null);
    return Boolean(token);
  },

  logout: (): void => {
    storage.remove(storage.keys.AUTH_TOKEN);
    storage.remove(storage.keys.CURRENT_USER);
  },
};
