import { useCameraPermissions } from "expo-camera";

const usePermission = () => {
  const [permission, requestPermission] = useCameraPermissions();
  async function checkCameraPermission() {
    if (!permission) {
      await requestPermission();
    }
  }
  return { checkCameraPermission };
};

export default usePermission;
