import React from "react";
import { Dimensions, Text, View } from "react-native";

const SignIn = () => {
  const { height } = Dimensions.get("screen");
  return (
    <View style={{ height }}>
      <Text>SignIn</Text>
    </View>
  );
};

export default SignIn;
