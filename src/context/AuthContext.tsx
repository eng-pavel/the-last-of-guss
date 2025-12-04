import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import axios from 'axios';
import type { AuthUser } from '../types/auth';
import { loginRequest } from '../api/authApi';
import { setAuthToken } from '../api/client';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (payload: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'guss_auth';

function readInitialUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw: string | null = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: AuthUser = JSON.parse(raw) as AuthUser;

    if (parsed && parsed.token) {
      // сразу проставляем заголовок для axios
      setAuthToken(parsed.token);
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readInitialUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await loginRequest(payload);

      setAuthToken(data.token);
      setUser(data);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }

      setIsLoading(false);
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
      setUser(null);
      setError(message);
      setIsLoading(false);

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY);
      }

      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    setError(null);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
