import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, View } from "react-native";
import { Avatar, Surface, useTheme } from "react-native-paper";

const ProfilePic = ({
  userDetails,
  canEdit = false,
}: {
  userDetails: any;
  canEdit?: boolean;
}) => {
  const { colors } = useTheme();
  return (
    <View style={{}}>
      {userDetails?.profile_pic ? (
        <Surface
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            overflow: "hidden",
          }}
          mode="flat"
        >
          <Avatar.Image size={80} source={{ uri: userDetails?.profile_pic }} />
        </Surface>
      ) : (
        <Surface
          style={{
            backgroundColor: "white",
            height: 80,
            width: 80,
            borderRadius: 40,
          }}
          mode="flat"
        >
          <MaterialIcons
            name="account-circle"
            size={80}
            color={colors.primaryContainer}
          />
        </Surface>
      )}
      {canEdit && (
        <Pressable
          onPress={() => {}}
          style={{
            position: "absolute",
            top: 60,
            left: 48,
            backgroundColor: colors?.background,
            padding: 4,
            borderRadius: 16,
          }}
        >
          <MaterialIcons name="edit" />
        </Pressable>
      )}
    </View>
  );
};

export default ProfilePic;
