export type UserRole = 'super_admin' | 'superadmin' | 'mechanic' | 'technician';

export interface AdminUser {
  id: string;
  username: string;
  mobile?: string;
  name: string;
  role: UserRole;
  garageLocation?: string;
  createdAt?: string;
}

export interface CreateMechanicInput {
  name: string;
  usernameOrMobile: string;
  password: string;
}
