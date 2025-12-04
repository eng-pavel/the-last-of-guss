import { create } from 'zustand';
import axios from 'axios';
import type { AuthUser } from '../types/auth';
import { loginRequest } from '../api/authApi';
import { setAuthToken } from '../api/client';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (payload: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  async login(payload) {
    try {
      set({ isLoading: true, error: null });

      const data = await loginRequest(payload);

      setAuthToken(data.token);
      set({ user: data, isLoading: false });

      return true;
    } catch (err) {
      let message = 'Не удалось войти. Попробуйте ещё раз.';

      if (axios.isAxiosError(err)) {
        const backendMessage = (err.response?.data as { message?: string } | undefined)?.message;
        if (backendMessage) {
          message = backendMessage;
        }
      }

      setAuthToken(null);
      set({ error: message, isLoading: false, user: null });

      return false;
    }
  },

  logout() {
    setAuthToken(null);
    set({ user: null, error: null });
  },
}));
