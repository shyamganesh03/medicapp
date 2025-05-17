import { ProfileMenuItemsProps } from "@/constants/profile-menu-items";
import { useRouter } from "expo-router";
import useAuth from "./useAuth";

const useProfileActions = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleProfileOptions = async (option: ProfileMenuItemsProps) => {
    if (option.type === "sign-out") {
      await logout();
      router.replace("/(auth)");
    }
  };

  return { handleProfileOptions };
};

export default useProfileActions;
