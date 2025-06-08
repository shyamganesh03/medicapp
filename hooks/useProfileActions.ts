import { update_user_details } from "@/api/auth_api";
import { ProfileMenuItemsProps } from "@/constants/profile-menu-items";
import { UserDetails, useUserStore } from "@/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import useAuth from "./useAuth";

const useProfileActions = () => {
  const router = useRouter();
  const { handleLogOut } = useAuth();
  const updateZustandUserDetails = useUserStore(
    (state) => state.updateZustandUserDetails
  );

  const [isProcessing, setIsProcessing] = useState(false);

  const handleProfileOptions = async (option: ProfileMenuItemsProps) => {
    if (option.type === "sign-out") {
      await handleLogOut();
    } else if (option.type === "edit-profile") {
      router.push("/edit-profile");
    }
  };

  const handleProfileUpdate = async (profileDetails: UserDetails) => {
    setIsProcessing(true);
    const updatedUserDetails = {
      ...profileDetails,
      calling_code: profileDetails?.country?.callingCode,
      country: profileDetails?.country?.cca2,
      uid: profileDetails?.id,
    };
    const result = await update_user_details(updatedUserDetails);
    if (!!result) {
      updateZustandUserDetails(profileDetails);
      setIsProcessing(false);
      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: result,
      });
    } else {
      setIsProcessing(false);

      Toast.show({
        type: "error",
        text1: "Profile Update Failed",
        text2: "There was an error updating your profile.",
      });
    }
  };

  return { isProcessing, handleProfileOptions, handleProfileUpdate };
};

export default useProfileActions;
