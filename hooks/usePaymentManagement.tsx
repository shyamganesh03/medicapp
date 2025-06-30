import {
  get_user_payment_method_details,
  update_user_payment_method,
} from "@/api/user_api";
import { useUserStore } from "@/store";
import { useState } from "react";
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
  const userDetails = useUserStore((state: any) => state.userDetails);

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

  return {
    isLoading,
    paymentDetails,
    setPaymentDetails,
    getPaymentDetails,
    updatePaymentDetails,
  };
};

export default usePaymentManagement;
