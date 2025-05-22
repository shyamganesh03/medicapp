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
            backgroundColor: colors.surfaceVariant,
            height: 80,
            width: 80,
            borderRadius: 40,
          }}
          mode="flat"
        >
          <MaterialIcons
            name="account-circle"
            size={80}
            color={colors.onSurfaceVariant}
          />
        </Surface>
      )}
      {canEdit && (
        <Pressable
          onPress={() => {}}
          style={{
            position: "absolute",
            backgroundColor: colors?.inverseSurface,
            padding: 4,
            borderRadius: 16,
            bottom: 0,
            right: 10,
          }}
        >
          <MaterialIcons
            name="edit"
            color={colors.inverseOnSurface}
            size={12}
          />
        </Pressable>
      )}
    </View>
  );
};

export default ProfilePic;
