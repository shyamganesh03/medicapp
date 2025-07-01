import { ProductPaymentModule } from "@/constants/app-text-data";
import usePaymentManagement from "@/hooks/usePaymentManagement";
import { useUserStore } from "@/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const Section1 = memo(
  ({
    totalAmount,
    productDetails,
  }: {
    totalAmount: string;
    productDetails: any;
  }) => {
    return (
      <View style={styles.contentContainer}>
        <View style={[styles.rowContainer]}>
          <Text variant="titleMedium">{productDetails.product_name}</Text>
        </View>
        <View style={[styles.rowContainer]}>
          <Text variant="labelLarge">Price: </Text>
          <Text variant="bodyMedium">{`${productDetails.price} Rs`}</Text>
        </View>
        <View style={[styles.rowContainer]}>
          <Text variant="labelLarge">quantity: </Text>
          <Text variant="bodyMedium">{productDetails.quantity}</Text>
        </View>
        <View style={[styles.rowContainer]}>
          <Text variant="labelLarge">Platform fee: </Text>
          <Text variant="bodyMedium">{`100 Rs`}</Text>
        </View>
        <View style={[styles.rowContainer]}>
          <Text variant="labelLarge">Total Amount: </Text>
          <Text variant="bodyMedium">{`${totalAmount} Rs`}</Text>
        </View>
      </View>
    );
  }
);

const Section2 = memo(
  ({ address, paymentDetails }: { address: any; paymentDetails: any }) => {
    const { colors } = useTheme();
    return (
      <View style={styles.contentContainer}>
        <View
          style={[styles.card, { backgroundColor: colors.secondaryContainer }]}
        >
          <Text variant="titleMedium">Delivery Address</Text>
          <View style={{ flexWrap: "wrap" }}>
            <Text>{`${address?.house_no}, ${address?.address_line_1},`}</Text>
            <Text>{address?.city}</Text>
            <Text>{address?.postal_code}</Text>
            <Text>{address?.country}</Text>
          </View>
        </View>
        <View
          style={[styles.card, { backgroundColor: colors.secondaryContainer }]}
        >
          <Text variant="titleMedium">payment Details</Text>
          <View style={{ flexWrap: "wrap" }}>
            <View style={[styles.rowContainer]}>
              <Text variant="labelLarge">Card Holder Name: </Text>
              <Text variant="bodyMedium">
                {paymentDetails?.card_holder_name}
              </Text>
            </View>
            <View style={[styles.rowContainer]}>
              <Text variant="labelLarge">Card Number: </Text>
              <Text variant="bodyMedium">{paymentDetails?.card_number}</Text>
            </View>
            <View style={[styles.rowContainer]}>
              <Text variant="labelLarge">Card Expiry Month: </Text>
              <Text variant="bodyMedium">{paymentDetails?.card_expiry_mm}</Text>
            </View>
            <View style={[styles.rowContainer]}>
              <Text variant="labelLarge">Card Expiry Year: </Text>
              <Text variant="bodyMedium">{paymentDetails?.card_expiry_yy}</Text>
            </View>
            <View style={[styles.rowContainer]}>
              <Text variant="labelLarge">Card CVV: </Text>
              <Text variant="bodyMedium">{paymentDetails?.card_cvv}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
);

const RenderSection = ({
  sectionId,
  totalAmount,
  productDetails,
  address,
  paymentDetails,
}: {
  sectionId: number;
  totalAmount: string;
  productDetails: any;
  address: any;
  paymentDetails: any;
}) => {
  switch (sectionId) {
    case 1:
      return (
        <Section1 totalAmount={totalAmount} productDetails={productDetails} />
      );
    case 2:
      return <Section2 address={address} paymentDetails={paymentDetails} />;

    default:
      return null;
  }
};

const ProductBuy = () => {
  const params: any = useLocalSearchParams();
  const productDetails = JSON.parse(params?.productDetails);
  const { height, width } = Dimensions.get("screen");
  const { colors } = useTheme();
  const router = useRouter();
  const [sectionId, setSectionId] = useState(1);
  const userDetails = useUserStore((state) => state.userDetails);
  const { getPaymentDetails, paymentDetails, isLoading, handleProductBuy } =
    usePaymentManagement();

  useEffect(() => {
    getPaymentDetails();
  }, []);

  const totalAmount = useMemo(() => {
    if (!!productDetails) {
      const finalAmount =
        parseFloat(productDetails.price) * productDetails.quantity + 100;
      return finalAmount.toFixed(2);
    } else return "0.00";
  }, [productDetails]);

  return (
    <ScrollView
      contentContainerStyle={{
        height,
        width,
        backgroundColor: colors.background,
        flexGrow: 1,
      }}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={colors.onPrimaryContainer}
            />
          </TouchableOpacity>
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            {ProductPaymentModule.HEADER_TITLE}
          </Text>
        </View>
        <View style={styles.mainContentContainer}>
          <RenderSection
            sectionId={1}
            totalAmount={totalAmount}
            productDetails={productDetails}
            address={userDetails.address}
            paymentDetails={paymentDetails?.card_details}
          />
          <RenderSection
            sectionId={2}
            totalAmount={totalAmount}
            productDetails={productDetails}
            address={userDetails.address}
            paymentDetails={paymentDetails?.card_details}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              handleProductBuy([productDetails], totalAmount);
            }}
            loading={isLoading}
          >
            {"Proceed to Payment"}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductBuy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 16 },
  contentContainer: {
    // flex: 1,
    overflow: "hidden",
    gap: 16,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainContentContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
    gap: 16,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 10,
  },
});
