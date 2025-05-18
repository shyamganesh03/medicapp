import { useUserStore } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
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
  const { createNewUser, getCurrentUserDetails } = useFireBase();
  const { createNewZustandUser } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSignUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setIsProcessing(true);
    const authResult: any = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      setIsProcessing(false);
      if (error.code === "auth/email-already-in-use") {
        Toast.show({
          type: "error",
          text2: "User name has been already taken.",
        });
      }
      console.log("error: ", error.json(), typeof error);
      return error;
    });
    if (authResult?.user) {
      const userDetails = {
        isNewUser: authResult?.additionalUserInfo?.isNewUser,
        uid: authResult?.user?._user?.uid,
        email: authResult?.user?._user?.email,
        emailVerified: authResult?.user?._user?.emailVerified,
        metaData: authResult?.user?._user?.metadata,
        fullName: "",
        contactNo: "",
        countryCode: "",
        qrCode: "",
      };
      createNewUser(userDetails).then((result) => {
        if (!result?.success) {
          setIsProcessing(false);
        } else {
          createNewZustandUser(userDetails);
          setIsProcessing(false);
        }
      });
    }
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
      createNewZustandUser(userDetails?.result?._data);
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
