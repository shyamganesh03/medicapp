import InputText from "@/components/ui/InputText";
import PasswordTextInput from "@/components/ui/PasswordTextInput";
import { AuthModule } from "@/constants/app-text-data";
import * as React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Avatar, Button, Surface, Text, useTheme } from "react-native-paper";

import AppIcon from "@/assets/images/app-icon.png";
import { validationRegex } from "@/constants/validations";
import useAuth from "@/hooks/useAuth";
import { Link, useLocalSearchParams } from "expo-router";

const SignIn = () => {
  const { height, width } = Dimensions.get("screen");
  const { colors } = useTheme();
  const { isProcessing, handleSignInWithEmailAndPassword } = useAuth();
  const params = useLocalSearchParams();
  const [loginDetails, setLoginDetails] = React.useState({
    userName: "",
    password: "",
  });

  const isValidEmail = React.useMemo(
    () => validationRegex.email.test(loginDetails?.userName),

    [loginDetails.userName]
  );

  const isValidPassword = React.useMemo(
    () => loginDetails.password.length > 5,
    [loginDetails.password]
  );

  const canDisableCTA = React.useMemo(
    () => !loginDetails?.userName || !loginDetails?.password,
    [loginDetails]
  );

  const handleTextInputChange = (text: string, fieldName: string) => {
    setLoginDetails((prev) => ({ ...prev, [fieldName]: text }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            {AuthModule.SIGN_IN_WELCOME_TEXT}
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.onPrimary }}>
            {AuthModule.SIGN_IN_WELCOME_DESCRIPTION}
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
            value={loginDetails?.userName}
            onChangeText={(value) => handleTextInputChange(value, "userName")}
            error={!isValidEmail && !!loginDetails?.userName}
          />
          <PasswordTextInput
            value={loginDetails.password}
            onChangeText={(value) => handleTextInputChange(value, "password")}
            error={!isValidPassword && !!loginDetails.password}
          />
          <Button
            mode="contained"
            onPress={() => {
              handleSignInWithEmailAndPassword(
                loginDetails?.userName,
                loginDetails?.password
              );
            }}
            disabled={canDisableCTA}
            loading={isProcessing}
          >
            {AuthModule.SIGN_IN}
          </Button>
          {/* <Surface
            mode="flat"
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              mode="text"
              onPress={() => console.log("Pressed")}
              labelStyle={{ color: colors.onBackground }}
            >
              {AuthModule.FORGOT_PASSWORD}
            </Button>
          </Surface> */}
          <Surface
            mode="flat"
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <Text variant="bodyMedium">{AuthModule.NOT_HAVE_AN_ACCOUNT}</Text>
            <Link href="/sign-up">
              <Text style={{ color: colors.primary }}>
                {AuthModule.SIGN_UP_NOW}
              </Text>
            </Link>
          </Surface>
        </Surface>
        <Surface
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

export default SignIn;
