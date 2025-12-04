export type UserRole = 'SURVIVOR' | 'NIKITA' | 'ADMIN';

export interface AuthUser {
  username: string;
  role: UserRole;
  token: string;
}
