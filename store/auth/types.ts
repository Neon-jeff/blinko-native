import { User } from "~/types";

export type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isOnboardingComplete: boolean;
}
export type UserActions = {
    login: (userData: User) => void;
    logout: () => void;
    updateProfile: (profileData: Partial<User>) => void;
};