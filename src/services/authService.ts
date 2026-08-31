import { AdminUser, CreateMechanicInput } from '../types/auth';
import { storage } from './storageService';
import { apiClient } from './apiClient';

const MECHANICS_KEY = 'chaudhari_auto_mechanics';

const DEFAULT_ADMIN: AdminUser = {
  id: 'usr-1',
  username: 'admin',
  mobile: '7387448878',
  name: 'Bhushan Chaudhari',
  role: 'super_admin',
  garageLocation: 'Pahur, Maharashtra',
};

interface LocalMechanicAccount extends AdminUser {
  passwordHash: string;
}

export const authService = {
  login: async (
    usernameOrMobile: string,
    password: string
  ): Promise<{ success: boolean; user?: AdminUser; error?: string }> => {
    const cleanUser = usernameOrMobile.trim().toLowerCase();
    const cleanPass = password.trim();

    try {
      // 1. Try Live Supabase PostgreSQL API Login
      const res = await apiClient.post<{
        success: boolean;
        token: string;
        user: AdminUser;
        error?: string;
      }>('/api/auth/login', {
        usernameOrMobile: cleanUser,
        password: cleanPass,
      });

      if (res.success && res.user && res.token) {
        const normalizedRole =
          res.user.role === 'mechanic' || res.user.role === 'technician'
            ? 'mechanic'
            : 'super_admin';
        const userObj: AdminUser = { ...res.user, role: normalizedRole };
        
        // Save plain token string and synced session
        localStorage.setItem('cac_auth_token', res.token);
        localStorage.setItem('chaudhari_auto_auth_token', res.token);
        storage.set(storage.keys.AUTH_TOKEN, res.token);
        storage.set(storage.keys.CURRENT_USER, userObj);
        return { success: true, user: userObj };
      }
    } catch {
      // 2. Fallback to Local Auth if Backend is unreachable
    }

    // Check Local Mechanics first
    const localMechanics = storage.get<LocalMechanicAccount[]>(MECHANICS_KEY, []);
    const matchingMech = localMechanics.find(
      (m) =>
        (m.username.toLowerCase() === cleanUser || (m.mobile && m.mobile === cleanUser)) &&
        m.passwordHash === cleanPass
    );

    if (matchingMech) {
      const user: AdminUser = {
        id: matchingMech.id,
        username: matchingMech.username,
        name: matchingMech.name,
        mobile: matchingMech.mobile,
        role: 'mechanic',
        permissions: matchingMech.permissions || ['billing'],
        garageLocation: 'Pahur Workshop',
      };
      const mechToken = `jwt-mech-${user.id}`;
      localStorage.setItem('cac_auth_token', mechToken);
      localStorage.setItem('chaudhari_auto_auth_token', mechToken);
      storage.set(storage.keys.AUTH_TOKEN, mechToken);
      storage.set(storage.keys.CURRENT_USER, user);
      return { success: true, user };
    }

    // Default Super Admin credentials
    const validSuperUsers = ['admin', '7387448878', '9503853143', 'chaudhari', 'garage'];
    const validSuperPass = ['admin', 'admin123', 'garage1994', '123456', 'chaudhari1994'];

    if (validSuperUsers.includes(cleanUser) && validSuperPass.includes(cleanPass)) {
      const adminToken = 'jwt-token-superadmin';
      localStorage.setItem('cac_auth_token', adminToken);
      localStorage.setItem('chaudhari_auto_auth_token', adminToken);
      storage.set(storage.keys.AUTH_TOKEN, adminToken);
      storage.set(storage.keys.CURRENT_USER, DEFAULT_ADMIN);
      return { success: true, user: DEFAULT_ADMIN };
    }

    return {
      success: false,
      error: 'Invalid username/mobile or password. Please check your credentials.',
    };
  },

  getCurrentUser: (): AdminUser | null => {
    return storage.get<AdminUser | null>(storage.keys.CURRENT_USER, null);
  },

  isAuthenticated: (): boolean => {
    const token =
      localStorage.getItem('chaudhari_auto_auth_token') ||
      localStorage.getItem('cac_auth_token') ||
      storage.get<string | null>(storage.keys.AUTH_TOKEN, null);
    return !!token;
  },

  isSuperAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return user.role === 'super_admin' || user.role === 'superadmin';
  },

  isMechanic: (): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return user.role === 'mechanic' || user.role === 'technician';
  },

  logout: (): void => {
    localStorage.removeItem('cac_auth_token');
    localStorage.removeItem('chaudhari_auto_auth_token');
    storage.remove(storage.keys.AUTH_TOKEN);
    storage.remove(storage.keys.CURRENT_USER);
  },

  // ─── Super Admin Mechanic Staff Management ───
  getMechanics: async (): Promise<AdminUser[]> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: AdminUser[] }>('/api/auth/mechanics');
      if (res.success && Array.isArray(res.data)) {
        const localList = storage.get<LocalMechanicAccount[]>(MECHANICS_KEY, []);
        const merged: LocalMechanicAccount[] = res.data.map((d) => {
          const found = localList.find((l) => l.id === d.id || l.username === d.username);
          return {
            ...d,
            role: 'mechanic',
            passwordPreview: found?.passwordPreview || found?.passwordHash || '',
            permissions: found?.permissions || ['billing'],
            passwordHash: found?.passwordHash || '******',
          };
        });
        storage.set(MECHANICS_KEY, merged);
        return merged.map(({ passwordHash: _, ...rest }) => rest);
      }
    } catch (err) {
      console.warn('Could not fetch mechanics from remote DB, loading local:', err);
    }
    const local = storage.get<LocalMechanicAccount[]>(MECHANICS_KEY, []);
    return local.map(({ passwordHash, ...rest }) => ({
      ...rest,
      passwordPreview: rest.passwordPreview || passwordHash,
      permissions: rest.permissions || ['billing'],
    }));
  },

  createMechanic: async (data: CreateMechanicInput): Promise<AdminUser> => {
    const cleanUser = data.usernameOrMobile.trim().toLowerCase();
    const cleanName = data.name.trim();
    const cleanPass = data.password.trim();
    const mobile = cleanUser.match(/^\d{10}$/) ? cleanUser : undefined;
    const newId = `usr-mech-${Date.now()}`;
    const permissions = data.permissions && data.permissions.length > 0 ? data.permissions : ['billing'];

    const newAccount: LocalMechanicAccount = {
      id: newId,
      username: cleanUser,
      mobile,
      name: cleanName,
      role: 'mechanic',
      passwordHash: cleanPass,
      passwordPreview: cleanPass,
      permissions,
      garageLocation: 'Pahur Workshop',
      createdAt: new Date().toISOString(),
    };

    // 1. Optimistic Local Save
    const existing = storage.get<LocalMechanicAccount[]>(MECHANICS_KEY, []);
    const updated = [newAccount, ...existing.filter((m) => m.username !== cleanUser)];
    storage.set(MECHANICS_KEY, updated);

    // 2. Dispatch real-time event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_mechanics_updated'));
    }

    // 3. Try Backend PostgreSQL API
    try {
      const res = await apiClient.post<{ success: boolean; data: AdminUser }>('/api/auth/mechanics', {
        name: cleanName,
        usernameOrMobile: cleanUser,
        password: cleanPass,
        permissions,
      });
      if (res.success && res.data) {
        newAccount.id = res.data.id;
        const synced = [newAccount, ...existing.filter((m) => m.username !== cleanUser && m.id !== res.data.id)];
        storage.set(MECHANICS_KEY, synced);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('chaudhari_mechanics_updated'));
        }
      }
    } catch (err) {
      console.warn('Backend mechanic creation sync warning:', err);
    }

    const { passwordHash: _, ...user } = newAccount;
    return user;
  },

  deleteMechanic: async (id: string): Promise<boolean> => {
    // 1. Local removal
    const existing = storage.get<LocalMechanicAccount[]>(MECHANICS_KEY, []);
    storage.set(MECHANICS_KEY, existing.filter((m) => m.id !== id));

    // 2. Dispatch real-time event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_mechanics_updated'));
    }

    // 3. Remote delete
    try {
      await apiClient.delete(`/api/auth/mechanics/${id}`);
    } catch (err) {
      console.warn('Backend mechanic deletion error:', err);
    }
    return true;
  },

  updateMechanicPermissions: async (id: string, permissions: string[]): Promise<AdminUser | null> => {
    // 1. Local update
    const existing = storage.get<LocalMechanicAccount[]>(MECHANICS_KEY, []);
    let updatedAccount: LocalMechanicAccount | null = null;
    const updated = existing.map((m) => {
      if (m.id === id) {
        updatedAccount = { ...m, permissions };
        return updatedAccount;
      }
      return m;
    });
    storage.set(MECHANICS_KEY, updated);

    // If current logged-in user is this mechanic, update active session
    const current = authService.getCurrentUser();
    if (current && current.id === id) {
      storage.set(storage.keys.CURRENT_USER, { ...current, permissions });
    }

    // 2. Dispatch real-time event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_mechanics_updated'));
    }

    // 3. Remote API update
    try {
      await apiClient.put(`/api/auth/mechanics/${id}`, { permissions });
    } catch (err) {
      console.warn('Remote mechanic permissions update warning:', err);
    }

    if (updatedAccount) {
      const acc = updatedAccount as LocalMechanicAccount;
      const { passwordHash: _, ...user } = acc;
      return user;
    }
    return null;
  },
};
