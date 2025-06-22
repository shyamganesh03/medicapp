import Toast from "react-native-toast-message";

const useHandleError = () => {
  const handleError = (errorMessage: any) => {
    Toast.show({
      type: "error",
      text2:
        !Array.isArray(errorMessage) && !!errorMessage
          ? errorMessage
          : "Something went wrong!",
    });
  };
  return { handleError };
};

export default useHandleError;
