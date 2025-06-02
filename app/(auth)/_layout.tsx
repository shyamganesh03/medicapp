import { useUserStore } from "@/store";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const userDetails = useUserStore((state) => state.userDetails);
  const [isUserDetailsChecked, setIsUserDetailsChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userDetails?.uid) {
      router.replace("/(tabs)");
    }
    setIsUserDetailsChecked(true);
  }, []);

  if (!isUserDetailsChecked) {
    return null;
  }

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
