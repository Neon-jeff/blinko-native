import { User } from "~/types";

export type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isOnboardingComplete: boolean;
    isGuestUser: boolean;
    rehydrated: boolean;
}
export type UserActions = {
    login: (userData: User) => void;
    logout: () => void;
    updateProfile: (profileData: Partial<User>) => void;
    completeOnboarding: () => void;
    setIsGuestUser: (isGuest: boolean) => void;
    setUser: (user: User | null) => void;
};