import axios from "axios";

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


