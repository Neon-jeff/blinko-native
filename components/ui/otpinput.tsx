import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import {Text} from "./text";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import {Input} from "./input";
import { constants } from "~/constants/indext";


interface OTPInputProps {
    value: string;
    onChangeText: () => void;
}

const OTPInput = ({value='',onChangeText}:OTPInputProps) => {
    const inputRef = React.useRef<TextInput>(null);

  function checkIfNextActiveInput(index: number): boolean {
    const emptyInput = [0, 1, 2, 3, 4, 5].filter((i) => !value[i])[0];
    return emptyInput === index;
  }
  function handleFocus(){
    inputRef.current?.focus();
  }
  useEffect(()=>{
    if(value.length == 6){
      Keyboard.dismiss();
    }
  },[value])
const styles = dynamicstyles()
  return (
    <View style={styles.otpContainer}>
      {[...Array(6).keys()].map((_, index) => {
        const styles = dynamicstyles(checkIfNextActiveInput(index))
        return(
        <Pressable key={index} style={styles.otpInput} onPress={handleFocus}>
          {!value[index] && checkIfNextActiveInput(index) && <Indicator />}
          {!value[index] && !checkIfNextActiveInput(index) && <StaleInput />}
          {value[index] && <Text >{value[index]}</Text>}
        </Pressable>
      )})}
      <View style={styles.hidden}>
        <Input
        ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          editable={value.length == 6}
          autoFocus
          inputMode='numeric'
        />
      </View>
    </View>
  );
};

export default OTPInput;

function Indicator() {
  const flashProgress = useSharedValue(0);
  useEffect(() => {
    flashProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1
    );
  }, []);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: interpolate(flashProgress.value, [0, 1], [0, 1]),
    transform: [{ scale: interpolate(flashProgress.value, [0, 1], [0.7, 1]) }],
    height: "50%",
    width: 2,
    backgroundColor: "#007AFF",
    borderRadius: 1000,
  }));
  return <Animated.View style={animatedStyles} />;
}

function StaleInput() {
  const styles = dynamicstyles()
  return <View style={styles.staleInput} />;
}

const dynamicstyles = (isCursor?:boolean)=>StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  otpInput: {
    width: constants.sizes.screen.width * 0.15 - 10,
    height: constants.sizes.screen.width * 0.15 - 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  staleInput: {
    width: "50%",
    height: 2,
    borderRadius: 1000,
  },
  hidden: {
    position: "absolute",
    top: 500,
    left: 0,
    width: 0,
    height: 0,
    opacity:0
  }
});