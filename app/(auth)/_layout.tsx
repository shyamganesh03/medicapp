import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </>
  );
};

export default AuthLayout;
