import axios from "axios";

export const get_categories_list = async () => {
  try {
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/products/get_categories_list`
    );
    if (result.data?.categories) {
      return result.data?.categories;
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

export const get_product_list_by_category_id = async (id: string) => {
  try {
    console.log("id: ", id);
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/products/get_product_list_by_category_id?category_id=${id}`
    );
    console.log("result --> ", result);
    if (result.data?.items) {
      return result.data?.items;
    } else return [];
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

export const get_product_by_id = async (id: string) => {
  try {
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/products/get_product_details_by_id?product_id=${id}`
    );
    console.log("result: ", result);
    if (result.data?.item) {
      return result.data?.item;
    } else return [];
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
