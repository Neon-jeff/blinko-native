
export interface AppState {
    isDrawerOpen: boolean;
}

export interface AppStateAction {
    setIsDrawerOpen: (isOpen: boolean) => void;
}