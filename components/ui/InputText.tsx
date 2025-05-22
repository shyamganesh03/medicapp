import React from "react";
import { TextInput } from "react-native-paper";

type InputTextProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  multiline?: boolean;
  numberOfLines?: number | undefined;
  disabled?: boolean;
};

const InputText = ({
  label,
  value,
  onChangeText,
  error = false,
  multiline = false,
  numberOfLines,
  disabled = false,
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
    />
  );
};

export default InputText;
