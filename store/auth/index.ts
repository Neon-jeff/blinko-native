import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '~/types';
import { UserActions, UserState } from './types';
import { zustandStorage } from '../local-store';

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isOnboardingComplete: false,
  isGuestUser: false,
};

export const useAuthStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      login: (userData: User) => set({ user: userData, isAuthenticated: true,isGuestUser: false }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (profileData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profileData } : null,
        })),
      completeOnboarding: () => set({ isOnboardingComplete: true }),
      setIsGuestUser: (isGuest: boolean) => set({ isGuestUser: isGuest }),
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
