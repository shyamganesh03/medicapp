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

import { validationRegex } from "@/constants/validations";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import AppIcon from "../../assets/images/app-icon.png";

const SignUp = () => {
  const { height, width } = Dimensions.get("screen");
  const { colors } = useTheme();
  const router = useRouter();
  const { isProcessing, handleSignUpWithEmailAndPassword } = useAuth();
  const [signupDetails, setSignupDetails] = React.useState({
    userName: "",
    password: "",
    reEnterPassword: "",
  });
  const [hasError, setHasError] = React.useState(false);

  const isValidEmail = React.useMemo(
    () => validationRegex.email.test(signupDetails?.userName),

    [signupDetails?.userName]
  );

  const isValidPassword = React.useMemo(
    () => signupDetails.password.length > 5,
    [signupDetails.password]
  );

  const canDisableSubmitCTA = React.useMemo(
    () =>
      hasError ||
      !signupDetails?.password ||
      !signupDetails?.reEnterPassword ||
      !signupDetails?.userName,
    [hasError, signupDetails]
  );

  const checkIsPasswordValid = (text: string, type: string) => {
    if (type === "password") {
      return text?.length < 4 && !!signupDetails?.password;
    } else {
      return text?.length < 4 || signupDetails?.password !== text;
    }
  };

  const handleTextInputChange = (text: string, fieldName: string) => {
    const hasError = checkIsPasswordValid(text, fieldName);
    setHasError(hasError);
    setSignupDetails((prev) => ({ ...prev, [fieldName]: text }));
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
            error={!isValidEmail && !!signupDetails?.userName}
          />
          <PasswordTextInput
            value={signupDetails.password}
            onChangeText={(value) => handleTextInputChange(value, "password")}
            error={!isValidPassword && !!signupDetails.password}
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
            onPress={() => {
              handleSignUpWithEmailAndPassword(
                signupDetails?.userName,
                signupDetails?.password
              );
            }}
            disabled={canDisableSubmitCTA || isProcessing}
            loading={isProcessing}
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
