import axios from "axios";
import * as FileSystem from "expo-file-system";
import { getAuthToken } from "./utils";

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
  } catch (error: any) {
    console.log("error: ", error);
    return error.response?.data?.error;
  }
};

export const get_user_details = async (uid: string) => {
  try {
    const token = await getAuthToken();
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/users/get_user_details?uid=${uid}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return result.data?.user;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return error.response?.data?.error;
  }
};

export const update_user_details = async (updatedUserDetails: any) => {
  try {
    const token = await getAuthToken();
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/users/update_user_details`,
      updatedUserDetails,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return result.data?.message;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return error.response?.data?.error;
  }
};

export const upload_image = async (payload: any) => {
  try {
    const token = await getAuthToken();
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
          Authorization: token,
        },
      }
    );
    return fileInfo;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return error.response?.data?.error;
  }
};

export const get_user_payment_method_details = async (uid: string) => {
  try {
    const token = await getAuthToken();
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/payment/get_user_payment_method_details?uid=${uid}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return result.data?.payment_details;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export const update_user_payment_method = async (updatedUserPayment: any) => {
  try {
    const token = await getAuthToken();
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/payment/update_user_payment_method`,
      updatedUserPayment,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return result.data?.message;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    return error.response?.data?.error;
  }
};