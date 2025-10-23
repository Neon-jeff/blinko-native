import React from "react";
import { BottomSheetModal, BottomSheetRef } from "../ui/bottom-sheet";
import ProfileSheetContent from "../shared/profile-sheet-content";

interface AppSheetContextType {
  openAppSheet: () => void;
  closeAppSheet: () => void;
}

const AppSheetContext = React.createContext<AppSheetContextType | null>(null);

export const AppSheetProvider = ({ children }: { children: React.ReactNode }) => {
    const sheetRef = React.useRef<BottomSheetRef>(null);

    function openAppSheet() {
        sheetRef.current?.open();
    }

    function closeAppSheet() {
        sheetRef.current?.close();
    }

  return (
    <AppSheetContext.Provider value={{ openAppSheet, closeAppSheet }}>
      {children}
      <BottomSheetModal.Root ref={sheetRef} >
        <BottomSheetModal.Content>
          <ProfileSheetContent onNavigate={closeAppSheet} />
        </BottomSheetModal.Content>
          {/* Your sheet content goes here */}
      </BottomSheetModal.Root>
    </AppSheetContext.Provider>
  );
};

export const useAppSheet = () => {
  const context = React.useContext(AppSheetContext);
  if (!context) {
    throw new Error("useAppSheet must be used within an AppSheetProvider");
  }
  return context;
};
