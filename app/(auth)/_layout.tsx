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
import { useUserStore } from "@/store";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const userDetails = useUserStore((state) => state.userDetails);
  const router = useRouter();
  useEffect(() => {
    if (userDetails?.uid) {
      router.replace("/(tabs)");
    }
  }, []);
  
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
