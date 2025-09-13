import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '~/types';
import { UserActions, UserState } from './types';
import { zustandStorage } from '../local-store';

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isOnboardingComplete: false,
};

export const useAuthStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      login: (userData: User) => set({ user: userData }),
      logout: () => set({ user: null }),
      updateProfile: (profileData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profileData } : null,
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)
