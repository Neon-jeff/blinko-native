import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { BottomSheetModal, BottomSheetRef } from './bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';

interface SelectModalContextValue {
  open: () => void;
  close: () => void;
  sheetRef: React.RefObject<BottomSheetRef | null>;
}

const SelectModalContext = React.createContext({} as SelectModalContextValue);

interface SelectModalProviderProps {
  children: React.ReactNode;
}

export const SelectModalProvider = ({ children }: SelectModalProviderProps) => {
  const sheetRef = React.useRef<BottomSheetRef>(null);

  const open = () => sheetRef.current?.open();
  const close = () => sheetRef.current?.close();

  return (
    <SelectModalContext.Provider value={{ open, close, sheetRef }}>
      {children}
    </SelectModalContext.Provider>
  );
};

function useSelectModal() {
  return React.useContext(SelectModalContext);
}

interface SelectModalProps {
  children: React.ReactNode;
}

const SelectModal = ({ children }: SelectModalProps) => {
  return <SelectModalProvider>{children}</SelectModalProvider>;
};

function SelectModalTrigger({ children }: { children: React.ReactNode }) {
  const { open } = useSelectModal();
  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    open();
  }

  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
}

interface SelectModalContentProps<K> {
  data: K[];
  RenderItem: ({ item, selected }: { item: K; selected?: boolean }) => React.ReactNode;
  height?: number;
}

function SelectModalContent<K>({ data, RenderItem, height }: SelectModalContentProps<K>) {
  const { sheetRef } = useSelectModal();
  return (
    <BottomSheetModal.Root ref={sheetRef} height={height}>
      <BottomSheetModal.Content className="px-2 pt-5">
        <FlashList
          data={data}
          extraData={{ selected: null }}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      </BottomSheetModal.Content>
    </BottomSheetModal.Root>
  );
}

export { SelectModal, SelectModalTrigger, SelectModalContent };

const styles = StyleSheet.create({});
