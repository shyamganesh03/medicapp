// import { AuthModule } from "@/constants/app-text-data";
// import * as React from "react";
// import { Dimensions } from "react-native";
// import { Surface, Text, TextInput, useTheme } from "react-native-paper";

// const AuthLayout = () => {
//   const { height, width } = Dimensions.get("window");
//   return (

//   );
// };

// export default AuthLayout;
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
