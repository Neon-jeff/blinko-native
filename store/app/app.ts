import {create} from 'zustand';
import { AppState, AppStateAction } from './types';

const initialState: AppState = {
    isDrawerOpen: false,
};

export const useAppStore = create<AppState & AppStateAction>((set) => ({
    ...initialState,
    setIsDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
}));