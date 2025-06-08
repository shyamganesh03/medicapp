import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import PhoneInput from "react-native-international-phone-number";
import { Button, Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import InputText from "@/components/ui/InputText";
import ProfilePic from "@/components/ui/ProfilePic";
import { ProfileModule } from "@/constants/app-text-data";
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
  const [profileDetails, setProfileDetails] = React.useState<UserDetails>();
  const { isProcessing, handleProfileUpdate } = useProfileActions();

  const { colors } = useTheme();

  useEffect(() => {
    if (userDetails?.id) {
      setProfileDetails(userDetails);
    }
  }, [userDetails]);

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
          {/* <InputText
            label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.ADDRESS}
            value={profileDetails?.home_address}
            onChangeText={(value) =>
              setProfileDetails({ ...profileDetails, home_address: value })
            }
            multiline
            numberOfLines={4}
          /> */}
          <Button
            mode="contained"
            onPress={() => {
              // @ts-ignore
              handleProfileUpdate(profileDetails);
            }}
            loading={isProcessing}
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
