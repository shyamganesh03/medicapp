import { ProfileMenuItemsProps } from "@/constants/profile-menu-items";
import { useRouter } from "expo-router";

const useProfileActions = () => {
  const router = useRouter();

  const handleProfileOptions = (option: ProfileMenuItemsProps) => {
    if (option.type === "sign-out") {
      router.replace("/(auth)");
    }
  };

  return { handleProfileOptions };
};

export default useProfileActions;
