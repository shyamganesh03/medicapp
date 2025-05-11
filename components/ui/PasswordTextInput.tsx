import React, { useState } from "react";
import { TextInput } from "react-native-paper";

type PasswordTextInputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  helperText?: string;
};

const PasswordTextInput: React.FC<PasswordTextInputProps> = ({
  label = "Password",
  value,
  onChangeText,
  error = false,
  helperText = "",
}) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureText}
      right={
        <TextInput.Icon
          icon={secureText ? "eye" : "eye-off"}
          onPress={() => setSecureText(!secureText)}
        />
      }
      error={error}
      mode="outlined"
      theme={{ roundness: 20 }}
    />
  );
};

export default PasswordTextInput;
