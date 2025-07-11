import { create_Order, revoke_order } from "@/api/products_api";
import {
  get_user_payment_method_details,
  update_user_payment_method,
} from "@/api/user_api";
import { useUserStore } from "@/store";
import { CFEnvironment, CFSession } from "cashfree-pg-api-contract";
import { useEffect, useRef, useState } from "react";
import { CFPaymentGatewayService } from "react-native-cashfree-pg-sdk";
import Toast from "react-native-toast-message";

const usePaymentManagement = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>({
    card_details: {
      card_number: "0000 0000 0000 0000",
      card_expiry_mm: "DD",
      card_holder_name: "Card Holder Name",
      card_cvv: "cvv",
      card_expiry_yy: "YY",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const userDetails = useUserStore((state: any) => state.userDetails);
  const orderId = useRef("");

  useEffect(() => {
    // Set up callback when component mounts
    CFPaymentGatewayService.setCallback({
      onVerify: async (orderID) => {
        Toast.show({
          type: "success",
          text2: "Your order has been successfully done!",
        });
      },
      onError: async (error, orderID) => {
        await revoke_order(orderId.current);
        Toast.show({
          type: "error",
          text2: "Your order has been canceled please try again.",
        });
      },
    });

    // Clean up when component unmounts
    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, []);

  const getPaymentDetails = async () => {
    setIsLoading(true);
    const paymentDetails = await get_user_payment_method_details(
      userDetails.id
    );

    setPaymentDetails(paymentDetails || null);

    setIsLoading(false);
  };

  const updatePaymentDetails = async (updatedDetails: any) => {
    setIsLoading(true);
    const payload = {
      uid: userDetails.id,
      card_details: {
        ...updatedDetails,
      },
    };

    const updateResponse = await update_user_payment_method(payload);

    setPaymentDetails((prev: any) => ({
      ...prev,
      card_details: payload.card_details,
    }));
    if (updateResponse)
      Toast.show({
        type: "success",
        text2: updateResponse,
      });
    setIsLoading(false);
  };

  const handleProductBuy = async (productList: any, totalAmount: string) => {
    try {
      setIsPaymentProcessing(true);
      //payload
      const payload = {
        userid: userDetails?.id,
        total_amount: parseFloat(totalAmount),
        productList,
      };
      // create order
      const orderDetails = await create_Order(payload);

      const session = new CFSession(
        orderDetails?.cf_order_response?.payment_session_id,
        orderDetails?.cf_order_response?.cf_order_id,
        CFEnvironment.SANDBOX
      );

      CFPaymentGatewayService.doWebPayment(session);
      setIsPaymentProcessing(false);
    } catch (error) {
      setIsPaymentProcessing(false);
      console.log("Error: ", error);
    }
  };

  return {
    isLoading,
    isPaymentProcessing,
    paymentDetails,
    setPaymentDetails,
    getPaymentDetails,
    updatePaymentDetails,
    handleProductBuy,
  };
};

export default usePaymentManagement;
