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
  rehydrated: false
};

export const useAuthStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      login: (userData: User) => set({ user: userData, isAuthenticated: true,isGuestUser: false }),
      logout: () => set({ user: null, isAuthenticated: false,isGuestUser: false }),
      updateProfile: (profileData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profileData } : null,
        })),
      completeOnboarding: () => set({ isOnboardingComplete: true }),
      setIsGuestUser: (isGuest: boolean) => set({ isGuestUser: isGuest }),
      setUser: (user: User | null) => set({ user }),
      rehydrated:false
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage() {
        return (state) => {
          if (state) {
            state.rehydrated = true;
          }
        };
      }
    }
  )
);
