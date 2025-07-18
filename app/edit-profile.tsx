import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import PhoneInput from "react-native-international-phone-number";
import { Button, Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { get_user_details } from "@/api/user_api";
import InputText from "@/components/ui/InputText";
import ProfilePic from "@/components/ui/ProfilePic";
import { ProfileModule } from "@/constants/app-text-data";
import useHandleError from "@/hooks/useHandleError";
import useProfileActions from "@/hooks/useProfileActions";
import { UserDetails, useUserStore } from "@/store";
import { StatusBar } from "expo-status-bar";

const Header = ({ colors }: { colors: MD3Colors }) => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 16,
        backgroundColor: colors.primaryContainer,
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 16,
      }}
    >
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color={colors.onPrimaryContainer}
        />
      </Pressable>
      <Text variant="titleLarge" style={{ color: colors.onPrimaryContainer }}>
        Edit Profile
      </Text>
    </View>
  );
};

const EditProfile = () => {
  const { height, width } = Dimensions.get("screen");
  const userDetails = useUserStore((state) => state.userDetails);
  const updateZustandUserDetails = useUserStore(
    (state) => state.updateZustandUserDetails
  );

  const [profileDetails, setProfileDetails] = React.useState<UserDetails>();
  const [isRefresh, setIsRefresh] = React.useState(false);
  const { isProcessing, handleProfileUpdate } = useProfileActions();
  const { handleError } = useHandleError();

  const { colors } = useTheme();

  useEffect(() => {
    if (userDetails?.id) setProfileDetails(userDetails);
  }, [userDetails]);

  const onRefresh = async () => {
    setIsRefresh(true);
    const response: any = await get_user_details(userDetails?.id);
    if (Array.isArray(response) && response.length > 0) {
      // @ts-ignore
      updateZustandUserDetails(response);
    } else {
      handleError(response);
    }
    setIsRefresh(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height,
        width,
        backgroundColor: colors.background,
      }}
    >
      <Header colors={colors} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 16,
          }}
        >
          <ProfilePic userDetails={userDetails} canEdit />
        </View>
        <View style={{ gap: 16, paddingHorizontal: 16 }}>
          <InputText
            label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.FULL_NAME}
            value={profileDetails?.full_name || ""}
            onChangeText={(value) =>
              setProfileDetails((prev: any) => ({
                ...prev,
                full_name: value,
              }))
            }
          />
          <InputText
            label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.EMAIL_ID}
            value={profileDetails?.email || ""}
            onChangeText={() => {}}
            disabled
          />
          <PhoneInput
            value={profileDetails?.phone_number || ""}
            onChangePhoneNumber={(value) => {
              setProfileDetails((prev: any) => ({
                ...prev,
                phone_number: value,
              }));
            }}
            selectedCountry={profileDetails?.country}
            defaultCountry="IN"
            onChangeSelectedCountry={(country) =>
              setProfileDetails((prev: any) => ({
                ...prev,
                country: country,
              }))
            }
            placeholder={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.CONTACT_NO}
            placeholderTextColor={colors.secondary}
            phoneInputStyles={{
              container: {
                borderRadius: 16,
                overflow: "hidden",
                backgroundColor: colors.background,
              },
              callingCode: {
                color: colors.onSecondaryContainer,
              },
              flagContainer: {
                backgroundColor: colors.secondaryContainer,
              },
              input: {
                color: colors.onBackground,
              },
            }}
          />
          <View
            style={{
              borderTopWidth: 0.5,
              borderColor: colors.outline,
              paddingVertical: 12,
              gap: 16,
            }}
          >
            <Text variant="bodyMedium">
              {ProfileModule.EDIT_PROFILE.ADDRESS}
            </Text>
            <InputText
              label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.HOUSE_NO}
              value={profileDetails?.address?.house_no!}
              onChangeText={(value) =>
                setProfileDetails({
                  ...profileDetails!,
                  // @ts-ignore
                  address: {
                    ...profileDetails?.address,
                    house_no: value,
                  },
                })
              }
            />
            <InputText
              label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.ADDRESS_LINE_1}
              value={profileDetails?.address?.address_line_1!}
              onChangeText={(value) =>
                setProfileDetails({
                  ...profileDetails!,
                  // @ts-ignore
                  address: {
                    ...profileDetails?.address,
                    address_line_1: value,
                  },
                })
              }
              multiline
              style={{
                height: 100,
              }}
            />
            <InputText
              label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.CITY}
              value={profileDetails?.address?.city!}
              onChangeText={(value) =>
                setProfileDetails({
                  ...profileDetails!,
                  // @ts-ignore
                  address: {
                    ...profileDetails?.address,
                    city: value,
                  },
                })
              }
            />
            <InputText
              label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.STATE}
              value={profileDetails?.address?.state!}
              onChangeText={(value) =>
                setProfileDetails({
                  ...profileDetails!,
                  // @ts-ignore
                  address: {
                    ...profileDetails?.address,
                    state: value,
                  },
                })
              }
            />
            <InputText
              label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.COUNTRY}
              value={profileDetails?.address?.country!}
              onChangeText={(value) =>
                setProfileDetails({
                  ...profileDetails!,
                  // @ts-ignore
                  address: {
                    ...profileDetails?.address,
                    country: value,
                  },
                })
              }
            />
          </View>
          <Button
            mode="contained"
            onPress={() => {
              // @ts-ignore
              handleProfileUpdate(profileDetails);
            }}
            loading={isProcessing}
            disabled={isProcessing}
          >
            {ProfileModule.EDIT_PROFILE.SAVE_CTA}
          </Button>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
