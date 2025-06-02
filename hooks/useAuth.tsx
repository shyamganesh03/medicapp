import { create_new_user } from "@/api/auth_api";
import { useUserStore } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import useFireBase from "./useFirebase";

const useAuth = () => {
  const auth = getAuth();
  const { getCurrentUserDetails } = useFireBase();
  const { createNewZustandUser } = useUserStore();
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
      const userDetails = await getCurrentUserDetails(authResult?.user?.uid);
      const userData = userDetails?.result?.data();
      const newUserDetails = {
        contact_number: userData?.contact_number,
        email: userData?.email,
        full_name: userData?.full_name,
        gender: "",
        home_address: "",
        profile_pic: "",
        qrCode: "",
        uid: userData?.uid,
        country_code: userData?.country_code,
        is_admin: false,
        is_email_verified: userData?.emailVerified,
        is_new_user: userData?.isNewUser,
        is_phone_verified: false,
      };
      createNewZustandUser(newUserDetails);
      router.replace("/(tabs)");
    }
  };

  const handleLogOut = async () => {
    await signOut(auth).then(() => {
      AsyncStorage.clear().then(() => {
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
