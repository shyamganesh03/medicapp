import React from "react";
import { TextInput } from "react-native-paper";

type InputTextProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  multiline?: boolean;
  numberOfLines?: number | undefined;
};

const InputText = ({
  label,
  value,
  onChangeText,
  error = false,
  multiline = false,
  numberOfLines,
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
    />
  );
};

export default InputText;
