import React from "react";
import { TextInput } from "react-native-paper";

type InputTextProps = {
  disabled?: boolean;
  error?: boolean;
  label: string;
  multiline?: boolean;
  numberOfLines?: number | undefined;
  onChangeText: (text: string) => void;
  style?: any;
  value: string;
};

const InputText = ({
  disabled = false,
  error = false,
  label,
  multiline = false,
  numberOfLines,
  onChangeText,
  style = {},
  value,
}: InputTextProps) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      theme={{ roundness: 20 }}
      error={error}
      multiline={multiline}
      numberOfLines={numberOfLines}
      disabled={disabled}
      style={style}
    />
  );
};

export default InputText;
