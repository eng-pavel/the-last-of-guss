import type { AuthUser } from '../types/auth';
import { apiClient } from './client';

export interface LoginPayload {
  username: string;
  password: string;
}

export async function loginRequest(payload: LoginPayload): Promise<AuthUser> {
  const { data } = await apiClient.post<AuthUser>('/api/v1/auth/login', payload);
  return data;
}
