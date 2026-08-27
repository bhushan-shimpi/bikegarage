export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'superadmin' | 'garage_manager' | 'technician';
  garageLocation: string;
}
