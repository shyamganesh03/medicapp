import InputText from "@/components/ui/InputText";
import PasswordTextInput from "@/components/ui/PasswordTextInput";
import { AuthModule } from "@/constants/app-text-data";
import * as React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { Avatar, Button, Surface, Text, useTheme } from "react-native-paper";

import { useRouter } from "expo-router";
import AppIcon from "../../assets/images/app-icon.png";

const SignUp = () => {
  const { height, width } = Dimensions.get("screen");
  const { colors } = useTheme();
  const router = useRouter();
  const [signupDetails, setSignupDetails] = React.useState({
    userName: "",
    password: "",
    reEnterPassword: "",
  });
  const [hasError, setHasError] = React.useState(false);

  const checkIsPasswordValid = (text: string, type: string) => {
    if (type === "password") {
      return text?.length < 4 && !!signupDetails?.password;
    } else {
      return (
        ((text?.length < 4 && !!signupDetails?.reEnterPassword) ||
          signupDetails?.password !== text) &&
        !!signupDetails?.reEnterPassword
      );
    }
  };

  const handleTextInputChange = (text: string, fieldName: string) => {
    setSignupDetails((prev) => ({ ...prev, [fieldName]: text }));
    const hasError = checkIsPasswordValid(text, fieldName);
    setHasError(hasError);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      style={{
        height,
        width,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Surface
          style={{
            height: "25%",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            backgroundColor: colors.primary,
          }}
          mode="flat"
        >
          <Text variant="displaySmall" style={{ color: colors.onPrimary }}>
            {AuthModule.SIGN_UP_WELCOME_TEXT}
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.onPrimary }}>
            {AuthModule.SIGN_UP_WELCOME_DESCRIPTION}
          </Text>
        </Surface>
        <Surface
          style={{
            backgroundColor: colors.background,
            flex: 1,
            gap: 16,
            paddingHorizontal: 16,
            paddingTop: "30%",
          }}
        >
          <InputText
            label={AuthModule.LABEL_USER_NAME}
            value={signupDetails?.userName}
            onChangeText={(value) => handleTextInputChange(value, "userName")}
          />
          <PasswordTextInput
            value={signupDetails.password}
            error={
              signupDetails?.password?.length < 4 && !!signupDetails?.password
            }
            onChangeText={(value) => handleTextInputChange(value, "password")}
          />
          <PasswordTextInput
            value={signupDetails.reEnterPassword}
            label={AuthModule.LABEL_RE_ENTER_PASSWORD}
            error={
              ((signupDetails?.reEnterPassword?.length < 4 &&
                !!signupDetails?.reEnterPassword) ||
                signupDetails?.password !== signupDetails?.reEnterPassword) &&
              !!signupDetails?.reEnterPassword
            }
            onChangeText={(value) =>
              handleTextInputChange(value, "reEnterPassword")
            }
          />
          <Button
            mode="contained"
            onPress={() => console.log("Pressed")}
            disabled={
              hasError ||
              !signupDetails?.password ||
              !signupDetails?.reEnterPassword ||
              !signupDetails?.userName
            }
          >
            Submit
          </Button>
          <Surface
            mode="flat"
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <Text variant="bodyMedium">{AuthModule.HAVE_AN_ACCOUNT}</Text>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Text style={{ color: colors.primary }}>
                {AuthModule.SIGN_IN}
              </Text>
            </Pressable>
          </Surface>
        </Surface>
        <Surface
          // mode="flat"
          style={{
            backgroundColor: "white",
            height: 80,
            width: 80,
            borderRadius: 40,
            position: "absolute",
            top: "20%",
            left: "40%",
          }}
        >
          <Avatar.Image size={80} source={AppIcon} />
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
