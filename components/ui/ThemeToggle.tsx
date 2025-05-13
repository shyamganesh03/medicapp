import { ProfileModule } from "@/constants/app-text-data";
import { useThemeStore } from "@/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Surface, Switch, Text, useTheme } from "react-native-paper";

const ThemeToggle = () => {
  const { colors } = useTheme();
  const updateTheme = useThemeStore((state: any) => state.updateTheme);
  const theme = useThemeStore((state: any) => state.theme);

  const handleUpdateTheme = () => {
    updateTheme(theme === "Dark");
  };

  return (
    <Surface
      style={{
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: colors.background,
        marginBottom: 16,
        justifyContent: "space-between",
      }}
      mode="flat"
    >
      <Surface
        mode="flat"
        style={{
          flexDirection: "row",
          backgroundColor: "transparent",
          alignItems: "center",
          gap: 16,
        }}
      >
        <MaterialIcons name="contrast" size={24} color={colors.secondary} />
        <Text variant="labelLarge">
          {ProfileModule.OPTION_CARD_TITLE.THEME}
        </Text>
      </Surface>
      <Switch value={theme === "Dark"} onValueChange={handleUpdateTheme} />
    </Surface>
  );
};

export default ThemeToggle;
