import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { DefaultTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { Colors } from "@/constants/Colors";
import { useThemeStore, useUserStore } from "@/store";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const currentTheme = useThemeStore((state: any) => state.theme);
  const addNewUser = useUserStore((state) => state.createNewUser);
  const userDetails = useUserStore((state) => state.userDetails);
  const [initialRoute, setInitialRoute] = useState("(auth)");

  const lightTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        ...Colors.light,
      },
    }),
    []
  );

  const darkTheme = useMemo(
    () => ({
      ...MD3DarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        ...Colors.dark,
      },
    }),
    []
  );

  const theme = useMemo(
    () => (currentTheme === "Dark" ? darkTheme : lightTheme),
    [currentTheme, darkTheme, lightTheme]
  );

  const handleAuthStateChanged = (userDetails: any) => {
    console.log(userDetails);
    // addNewUser(userDetails);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (userDetails) {
      setInitialRoute("(tabs)");
    }
  }, [userDetails]);

  if (!loaded && !!initialRoute) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="qr-code-screen" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </PaperProvider>
  );
}
