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
