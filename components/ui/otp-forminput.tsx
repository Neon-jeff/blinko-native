import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import OTPInput from "./otpinput";


interface OTPFormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: PathValue<T, Path<T>>;
  //   containerStyle?: ViewStyle;
}
const OTPFormInput = <T extends FieldValues>({
  name,
  control,
  defaultValue,
}: OTPFormInputProps<T>) => {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <OTPInput value={value} onChangeText={onChange} />
      )}
    />
  );
};

export default OTPFormInput;