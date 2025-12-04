import { create } from 'zustand';

export type UserRole = 'SURVIVOR' | 'NIKITA' | 'ADMIN';

export interface AuthUser {
    username: string;
    role: UserRole;
    token: string;
}

interface AuthState {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
