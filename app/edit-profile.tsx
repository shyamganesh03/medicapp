import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
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
import { useUserStore } from "@/store";

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
  const [profileDetails, setProfileDetails] = React.useState(userDetails);
  const { isProcessing, handleProfileUpdate } = useProfileActions();

  const { colors } = useTheme();

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
            value={profileDetails?.full_name}
            onChangeText={(value) =>
              setProfileDetails({ ...profileDetails, full_name: value })
            }
          />
          <InputText
            label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.EMAIL_ID}
            value={profileDetails?.email}
            onChangeText={(value) =>
              setProfileDetails({ ...profileDetails, email: value })
            }
          />
          <PhoneInput
            value={profileDetails?.contact_number}
            onChangePhoneNumber={(contactNo) =>
              setProfileDetails({
                ...profileDetails,
                contact_number: contactNo,
              })
            }
            selectedCountry={profileDetails?.country_code}
            onChangeSelectedCountry={(countryCode) =>
              setProfileDetails({
                ...profileDetails,
                country_code: countryCode,
              })
            }
            placeholder={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.CONTACT_NO}
            placeholderTextColor={colors.secondary}
            phoneInputStyles={{
              container: {
                borderRadius: 16,
                overflow: "hidden",
              },
              flagContainer: {
                backgroundColor: colors.secondaryContainer,
              },
            }}
          />
          <InputText
            label={ProfileModule.EDIT_PROFILE.TEXT_INPUT_LABEL.ADDRESS}
            value={profileDetails?.home_address}
            onChangeText={(value) =>
              setProfileDetails({ ...profileDetails, home_address: value })
            }
            multiline
            numberOfLines={4}
          />
          <Button
            mode="contained"
            onPress={() => handleProfileUpdate(profileDetails)}
            loading={isProcessing}
          >
            {ProfileModule.EDIT_PROFILE.SAVE_CTA}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
