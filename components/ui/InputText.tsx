import React from "react";
import { TextInput } from "react-native-paper";

type InputTextProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  helperText?: string;
};

const InputText = ({
  label,
  value,
  onChangeText,
  error = false,
  helperText = "",
}: InputTextProps) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      theme={{ roundness: 20 }}
      error={error}
    />
  );
};

export default InputText;
