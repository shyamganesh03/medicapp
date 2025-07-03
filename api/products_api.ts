import axios from "axios";
import { getAuthToken } from "./utils";

export const get_categories_list = async () => {
  try {
    const token = await getAuthToken();
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/products/get_categories_list`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return result.data?.categories;
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

export const get_product_list_by_category_id = async (id: string) => {
  try {
    const token = await getAuthToken();

    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/products/get_product_list_by_category_id?category_id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (result.data?.items) {
      return result.data?.items;
    } else return [];
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

export const get_product_by_id = async (id: string) => {
  try {
    const token = await getAuthToken();
    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/products/get_product_details_by_id?product_id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (result.data?.item) {
      return result.data?.item;
    } else return [];
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

export const create_Order = async (payload: any) => {
  try {
    const token = await getAuthToken();

    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }
    const finalPayload = {
      customer_id: payload?.userid,
      total_amount: payload?.total_amount,
      currency: "INR",
      cart_items: payload.productList,
    };

    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/orders/create_orders`,
      finalPayload,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (result.data?.order_id) {
      return result.data;
    } else return false;
  } catch (error: any) {
    console.log("error: ", error);
    return error.response?.data?.error;
  }
};

export const getPaymentStatus = async (order_id: string) => {
  try {
    const token = await getAuthToken();

    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/orders/get_order_payment_details?order_id=${order_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (result.data?.payment_details) {
      return result.data;
    } else return false;
  } catch (error: any) {
    console.log("error: ", error);
    return error.response?.data?.error;
  }
};

export const revoke_order = async (orderId: string) => {
  try {
    const token = await getAuthToken();

    if (!process.env.EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not defined");
    }

    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/orders/revoke_order?order_id=${orderId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (result.data?.message) {
      return result.data;
    } else return false;
  } catch (error: any) {
    console.log("error: ", error);
    return error.response?.data?.error;
  }
};