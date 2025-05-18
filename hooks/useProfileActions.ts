import { ProfileMenuItemsProps } from "@/constants/profile-menu-items";
import { useRouter } from "expo-router";
import useAuth from "./useAuth";

const useProfileActions = () => {
  const router = useRouter();
  const { handleLogOut } = useAuth();

  const handleProfileOptions = async (option: ProfileMenuItemsProps) => {
    if (option.type === "sign-out") {
      await handleLogOut();
    }
  };

  return { handleProfileOptions };
};

export default useProfileActions;
