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
