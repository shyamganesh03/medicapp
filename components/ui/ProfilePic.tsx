import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Avatar, Surface, useTheme } from "react-native-paper";

import { get_user_details, upload_image } from "@/api/user_api";
import { ProfileModule } from "@/constants/app-text-data";
import usePermission from "@/hooks/usePermission";
import { useUserStore } from "@/store";
import Toast from "react-native-toast-message";

const ProfilePic = ({
  userDetails,
  canEdit = false,
}: {
  userDetails: any;
  canEdit?: boolean;
}) => {
  const { colors } = useTheme();
  const { checkCameraPermission, checkMediaPermission } = usePermission();
  const updateZustandUserDetails = useUserStore(
    (state) => state.updateZustandUserDetails
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await checkCameraPermission();
      await checkMediaPermission();
    })();
  }, []);

  const handelImagePicker = () => {
    ImagePicker.launchImageLibraryAsync({
      legacy: true,
    }).then(async (selectedFile) => {
      if (!selectedFile.canceled) {
        setIsLoading(true);
        const assetDetails = selectedFile.assets[0];
        const payload = {
          photo: {
            uri: assetDetails.uri,
            name: assetDetails.fileName,
            type: assetDetails.type,
          },
          uid: userDetails?.id,
          mimeType: assetDetails.mimeType,
          type: "profile_pic",
        };
        const result = await upload_image(payload);

        if (result) {
          const userData = await get_user_details(userDetails?.id);
          updateZustandUserDetails(userData);
          Toast.show({
            type: "success",
            text2: ProfileModule.TOAST.IMAGE_UPLOAD_SUCCESSFULLY,
          });
        }
        setIsLoading(false);
      }
    });
  };
  
  return (
    <View style={{}}>
      <Surface
        style={[
          {
            height: 80,
            width: 80,
            borderRadius: 40,
            overflow: "hidden",
          },
          {
            backgroundColor: userDetails?.profile_pic
              ? colors.surfaceVariant
              : undefined,
          },
        ]}
        mode="flat"
      >
        {isLoading && (
          <ActivityIndicator
            style={{ position: "absolute", top: "40%", left: "40%" }}
            size={24}
            color={colors.primary}
          />
        )}
        {userDetails?.profile_pic ? (
          <Avatar.Image size={80} source={{ uri: userDetails?.profile_pic }} />
        ) : (
          <MaterialIcons
            name="account-circle"
            size={80}
            color={colors.onSurfaceVariant}
          />
        )}
      </Surface>

      {canEdit && (
        <Pressable
          onPress={handelImagePicker}
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
