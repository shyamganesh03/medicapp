import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";

import "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { useState } from "react";

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...Colors.light,
    },
  };

  const darkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...Colors.dark,
    },
  };

  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />
        {/* <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
