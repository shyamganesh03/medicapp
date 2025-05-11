import { Colors } from "@/constants/Colors";

export const useColorScheme = () => {
  const theme = "light";
  return { colors: Colors[theme], theme };
};
