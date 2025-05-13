import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { DefaultTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";

import "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@/store";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const currentTheme = useThemeStore((state: any) => state.theme);

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

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
