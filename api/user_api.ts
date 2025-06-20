import axios from "axios";
import * as FileSystem from "expo-file-system";

export const create_new_user = async (email: string, password: string) => {
  try {
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/authentication/create_new_user`,
      {
        email,
        password,
      }
    );
    if (result.data?.user?.id) {
      return true;
    } else return false;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};

export const get_user_details = async (uid: string) => {
  try {
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/users/get_user_details?uid=${uid}`
    );
    if (result.data?.user?.id) {
      return result.data?.user;
    } else return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return false;
  }
};

export const update_user_details = async (updatedUserDetails: any) => {
  try {
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/users/update_user_details`,
      updatedUserDetails
    );
    if (result.status === 200) {
      return result.data?.message;
    } else return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return false;
  }
};

export const upload_image = async (payload: any) => {
  try {
    const fileInfo = await FileSystem.uploadAsync(
      `${process.env.EXPO_PUBLIC_API_URL}/users/upload_image`,
      payload.photo.uri,
      {
        fieldName: "photo",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        parameters: {
          uid: payload.uid,
          type: payload.type,
          mime_type: payload.mimeType,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("fileInfo: ", fileInfo);
    // const formData = new FormData();
    // formData.append("uid", payload.id);
    // formData.append("type", payload.type);
    // formData.append("photo", payload.photo);
    // formData.append("mime_type", payload.photo.mimeType);

    // if (!process.env.EXPO_PUBLIC_API_URL) {
    //   throw new Error("EXPO_PUBLIC_API_URL is not defined");
    // }
    // const result = await axios.post(
    //   `${process.env.EXPO_PUBLIC_API_URL}/users/upload_image`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    // if (result.status === 200) {
    //   return result.data?.message;
    // } else return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return false;
  }
};
