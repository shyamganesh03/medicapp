import { AlertModule, PermissionModule } from "@/constants/app-text-data";
import { AlertContext } from "@/context/Alert";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useContext } from "react";
import { Linking, Platform } from "react-native";

const usePermission = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const { showAlert } = useContext(AlertContext);
  async function checkCameraPermission() {
    if (!permission) {
      await requestPermission();
    }
  }
  async function checkMediaPermission() {
    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (permission.status === ImagePicker.PermissionStatus.GRANTED) {
      return true;
    } else if (
      !permission.canAskAgain ||
      (Platform.OS === "android" && Platform.Version <= 33)
    ) {
      showAlert({
        type: "info",
        title: PermissionModule.GRANT_PERMISSION,
        description: PermissionModule.CAMERA_DESCRIPTION,
        primaryCTAText: AlertModule.OPEN_SETTINGS,
        handlePrimaryCTA: () => Linking.openSettings(),
      });
    } else {
      return false;
    }
  }
  return { checkCameraPermission,  checkMediaPermission };
};

export default usePermission;
