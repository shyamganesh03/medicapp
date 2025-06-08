import { create_new_user, get_user_details } from "@/api/auth_api";
import { defaultCountry, defaultUserDetails } from "@/constants/default-data";
import { useUserStore } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
// @ts-ignore
import { countries } from "react-native-international-phone-number/lib/constants/countries";

import Toast from "react-native-toast-message";

const useAuth = () => {
  const auth = getAuth();
  const { createNewZustandUser, updateZustandUserDetails } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSignUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    console.log("email worked: ");
    setIsProcessing(true);
    const canSignedUpSuccessfully = await create_new_user(email, password);
    if (canSignedUpSuccessfully) {
      router.push({ pathname: "/(auth)", params: { email } });
      Toast.show({
        type: "success",
        text2: "Medic account has been created successfully.",
      });
    }
    setIsProcessing(false);
  };

  const handleSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setIsProcessing(true);
    const authResult: any = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      setIsProcessing(false);
      if (error.code === "auth/invalid-credential") {
        Toast.show({
          type: "error",
          text2: "InValid Credential.",
        });
      }
      return error;
    });
    if (authResult?.user) {
      const userData = await get_user_details(authResult?.user?.uid);
      if (userData?.id) {
        const country = countries?.find(
          (countryItem: any) =>
            countryItem?.callingCode === userData?.calling_code
        );
        const newUserDetails = {
          id: userData?.id,
          full_name: userData?.full_name,
          email: userData?.email,
          profile_pic: userData?.profile_pic,
          phone_number: userData?.phone_number,
          house_no: userData?.house_no,
          street_name: userData?.street_name,
          city: userData?.city,
          country: country || defaultCountry,
          address_type: userData?.address_type,
          shop_name: userData?.address_type,
          is_phone_number_verified: userData?.is_phone_number_verified,
          is_email_verified: userData?.is_email_verified,
          is_admin: userData?.is_admin,
          role: userData?.role,
          is_active: userData?.is_active,
        };
        createNewZustandUser(newUserDetails);
        router.replace("/(tabs)");
      }
    }
  };

  const handleLogOut = async () => {
    await signOut(auth).then(() => {
      AsyncStorage.clear().then(() => {
        updateZustandUserDetails(defaultUserDetails);
        router.replace("/(auth)");
      });
    });
  };

  return {
    handleLogOut,
    handleSignInWithEmailAndPassword,
    handleSignUpWithEmailAndPassword,
    isProcessing,
  };
};

export default useAuth;
