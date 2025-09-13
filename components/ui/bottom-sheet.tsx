import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Portal } from '@rn-primitives/portal';
import { sizes } from "~/constants/sizes";


/**
 * BottomSheetModal component that displays a bottom sheet with gesture handling.
 * It uses React Native Reanimated and Gesture Handler for smooth animations and interactions.
 *
 * @component
 * @example
 * return (
 *   <BottomSheetModal ref={bottomSheetRef} />
 * );
 */
export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

interface BottomSheetRootProps {
  children?: React.ReactNode;
}
const BottomSheetModalRoot = forwardRef<BottomSheetRef, BottomSheetRootProps>(
  ({ children }, ref) => {
    const [showSheet, setShowSheet] = React.useState(false);
    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => {
            sheetTranslateY.value = withTiming(0, {
              duration: 300,
            });
            setShowSheet(true);
          },
          close: () => {
            sheetTranslateY.value = withTiming(initialHeight + 300, {
              duration: 300,
            });
            setShowSheet(false);
          },
        };
      },
      []
    );
    useEffect(() => {
      if (showSheet) {
        sheetTranslateY.value = withTiming(0, {
          duration: 500,
        });
        return;
      }
    }, [showSheet]);

    const initialHeight = sizes.screen.height * 0.5;
    const finalHeight = sizes.screen.height * 0.9;
    const sheetTranslateY = useSharedValue(initialHeight + 200);
    const sheetHeight = useSharedValue(initialHeight);
    function handleCloseSheet() {
      "worklet";
      sheetTranslateY.value = withTiming(initialHeight + 300, {
        duration: 300,
      });
    }
    useAnimatedReaction(
      () => sheetTranslateY,
      (curr) => {
        if (curr.value === initialHeight + 300 && showSheet) {
          sheetHeight.value = withSpring(initialHeight);
          runOnJS(setShowSheet)(false);
          return;
        }
      }
    );
    const gesture = Gesture.Pan()
      .onUpdate((event) => {
        if (sheetHeight.value >= finalHeight) {
          if (event.translationY < 0) {
            return;
          }
        }
        if (event.translationY < 0 && sheetHeight.value < finalHeight) {
          sheetHeight.value = Math.abs(event.translationY) + initialHeight;
          return;
        }
        sheetTranslateY.value = event.translationY;
      })
      .onEnd((event) => {
        // close the modal if the user drags down more than 400px
        if (event.translationY > 200) {
          handleCloseSheet();
          return;
        }
        if (sheetHeight.value >= finalHeight) {
          if (event.translationY > 0 && event.translationY < 100) {
            sheetTranslateY.value = withTiming(0);
            return;
          }
          if (event.translationY > 0 && event.translationY > 100) {
            sheetTranslateY.value = withTiming(0);
            sheetHeight.value = withTiming(initialHeight);
            return;
          }
        }
        if (
          event.translationY > -100 &&
          event.translationY < 0 &&
          sheetHeight.value < finalHeight
        ) {
          sheetHeight.value = withSpring(initialHeight);
          return;
        }
        if (
          event.translationY < -100 &&
          event.translationY < 0 &&
          sheetHeight.value < finalHeight
        ) {
          sheetHeight.value = withSpring(finalHeight);
          sheetTranslateY.value = withSpring(0);
          return;
        }
        sheetTranslateY.value = withTiming(0);
      });

    const animatedRootStyle = useAnimatedStyle(() => ({
      height: sheetHeight.value,
      transform: [{ translateY: sheetTranslateY.value }],
    }));
    if (!showSheet) {
      return null;
    }
    return (
      <Portal name="bottom-sheet-modal">
        <Pressable style={[styles.overlayContainer]} onPress={handleCloseSheet}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.sheetContainer, animatedRootStyle]}>
              <View style={styles.dragger} />
              {children}
            </Animated.View>
          </GestureDetector>
        </Pressable>
      </Portal>
    );
  }
);

BottomSheetModalRoot.displayName = "BottomSheetModalRoot";

interface SubProps {
  children?: React.ReactNode;
}

function BottomSheetTitle({ children }: SubProps) {
  return <Pressable style={styles.headerContainer}>{children}</Pressable>;
}
BottomSheetTitle.displayName = "BottomSheetTitle";

function BottomSheetContent({ children }: SubProps) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {children}
    </ScrollView>
  );
}
BottomSheetContent.displayName = "BottomSheetContent";

export const BottomSheetModal = {
  Root: BottomSheetModalRoot,
  Title: BottomSheetTitle,
  Content: BottomSheetContent,
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    overflow: "hidden",
  },
  headerContainer: {
    padding: 12,
    paddingTop: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: 'gray',
  },
  dragger: {
    width: 24,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: 9999,
    alignSelf: "center",
    position: "absolute",
    top: 12,
  },
  contentContainer: {
    padding: 12,
    paddingTop: 10,
    paddingBottom: 24,
  },
});
