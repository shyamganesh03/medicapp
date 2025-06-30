import InputText from "@/components/ui/InputText";
import { PaymentModule } from "@/constants/app-text-data";
import usePaymentManagement from "@/hooks/usePaymentManagement";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";

type CardDetails = {
  card_number: string;
  card_expiry_mm: string;
  card_holder_name: string;
  card_cvv: string;
  card_expiry_yy: string;
};

const EditCardUI = memo(
  ({
    cardDetails,
    setCardDetails,
  }: {
    cardDetails: CardDetails;
    setCardDetails: any;
  }) => {
    const { colors } = useTheme();

    const handleTextChange = (field: string, text: string) => {
      if (field === "card_number") {
        let formattedText = text;
        if (text.length > 19) return;
        if (text.length % 4 === 0) {
          formattedText = cardDetails.card_number + " " + text.slice(-1);
        }
        setCardDetails((prev: any) => ({ ...prev, [field]: formattedText }));
      } else if (field === "card_expiry_mm") {
        if (text.length > 2 || Number(text) > 12) return;
        setCardDetails((prev: any) => ({ ...prev, [field]: text }));
      } else if (field === "card_expiry_yy") {
        if (text.length > 2) return;
        setCardDetails((prev: any) => ({ ...prev, [field]: text }));
      } else if (field === "card_cvv") {
        if (text.length > 3) return;
        setCardDetails((prev: any) => ({ ...prev, [field]: text }));
      } else {
        setCardDetails((prev: any) => ({ ...prev, [field]: text }));
      }
    };

    return (
      <>
        <InputText
          label={PaymentModule.INPUT_FIELD.CARD_NUMBER}
          onChangeText={function (text: string): void {
            handleTextChange("card_number", text);
          }}
          value={cardDetails.card_number}
          keyboardType="numeric"
          style={{ textAlign: "center" }}
        />
        <View style={{ marginVertical: 16, flexDirection: "row", gap: 16 }}>
          <View style={{ flexDirection: "row", gap: 8, width: "70%" }}>
            <InputText
              label={PaymentModule.INPUT_FIELD.CARD_EXPIRY_MM}
              onChangeText={function (text: string): void {
                handleTextChange("card_expiry_mm", text);
              }}
              value={cardDetails.card_expiry_mm}
              style={{ width: "35%" }}
              keyboardType="numeric"
            />
            <Text
              style={{
                color: colors.onSecondaryContainer,
                alignSelf: "flex-end",
              }}
              variant="headlineLarge"
            >
              /
            </Text>
            <InputText
              label={PaymentModule.INPUT_FIELD.CARD_EXPIRY_YY}
              onChangeText={function (text: string): void {
                handleTextChange("card_expiry_yy", text);
              }}
              value={cardDetails.card_expiry_yy}
              style={{ width: "35%" }}
              keyboardType="numeric"
            />
          </View>
          <InputText
            label={PaymentModule.INPUT_FIELD.CARD_CVV}
            onChangeText={function (text: string): void {
              setCardDetails((prev: any) => ({ ...prev, card_number: text }));
            }}
            value={cardDetails.card_cvv}
            style={{ width: "25%" }}
            keyboardType="numeric"
          />
        </View>
        <InputText
          label={PaymentModule.INPUT_FIELD.CARD_HOLDER_NAME}
          onChangeText={function (text: string): void {
            setCardDetails((prev: any) => ({
              ...prev,
              card_holder_name: text,
            }));
          }}
          value={cardDetails.card_holder_name}
          keyboardType="ascii-capable"
        />
      </>
    );
  }
);

const ViewCardUI = memo(({ paymentDetails }: { paymentDetails: any }) => {
  const { colors } = useTheme();

  const textStyle = {
    color: colors.onSecondaryContainer,
  };

  return (
    <>
      <Text
        variant="labelLarge"
        style={{ textAlign: "center", marginBottom: 16 }}
      >
        {paymentDetails.card_details.card_number}
      </Text>
      <View style={styles.section2}>
        <Text
          style={textStyle}
        >{`${paymentDetails.card_details.card_expiry_mm} / ${paymentDetails.card_details.card_expiry_yy}`}</Text>

        <Text style={textStyle}>{paymentDetails.card_details.card_cvv}</Text>
      </View>
      <Text style={textStyle}>
        {paymentDetails.card_details.card_holder_name}
      </Text>
    </>
  );
});

const PaymentManagement = () => {
  const { height, width } = Dimensions.get("screen");
  const { isLoading, updatePaymentDetails, getPaymentDetails, paymentDetails } =
    usePaymentManagement();
  const [isRefresh, setIsRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    card_number: "",
    card_expiry_mm: "",
    card_holder_name: "",
    card_cvv: "",
    card_expiry_yy: "",
  });
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    getPaymentDetails();
  }, []);

  useEffect(() => {
    if (paymentDetails?.card_details) {
      setCardDetails(paymentDetails.card_details);
    }
  }, [paymentDetails]);

  const onRefresh = async () => {
    setIsRefresh(true);
    await getPaymentDetails();
    setIsRefresh(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height,
        width,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
      >
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={colors.onPrimaryContainer}
              />
            </TouchableOpacity>
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              {PaymentModule.HEADER_TITLE}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text variant="labelLarge">{PaymentModule.CARD_DETAILS}</Text>
            <Surface
              style={[
                styles.cardContainer,
                { backgroundColor: colors.secondaryContainer },
              ]}
            >
              {isEdit ? (
                <TouchableOpacity
                  style={styles.editStyle}
                  onPress={() => setIsEdit(false)}
                >
                  <Text
                    variant="bodySmall"
                    style={[styles.editTextStyle, { color: colors.primary }]}
                  >
                    {PaymentModule.BACK}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editStyle}
                  onPress={() => setIsEdit(true)}
                >
                  <Text
                    variant="bodySmall"
                    style={[styles.editTextStyle, { color: colors.primary }]}
                  >
                    {PaymentModule.EDIT}
                  </Text>
                </TouchableOpacity>
              )}
              {isEdit ? (
                <EditCardUI
                  cardDetails={cardDetails}
                  setCardDetails={setCardDetails}
                />
              ) : (
                <ViewCardUI paymentDetails={paymentDetails} />
              )}
              {isLoading && !isEdit ? (
                <View
                  style={[
                    styles.loadingContainer,
                    {
                      backgroundColor: colors.backdrop,
                    },
                  ]}
                >
                  <ActivityIndicator />
                </View>
              ) : (
                <></>
              )}
            </Surface>
            <Button
              mode="contained"
              onPress={() => {
                Keyboard.dismiss();
                updatePaymentDetails(cardDetails).then(() => setIsEdit(false));
              }}
              style={{ marginTop: 20 }}
              disabled={!isEdit || isLoading}
              loading={isLoading && isEdit}
            >
              {PaymentModule.SAVE}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PaymentManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 16 },
  contentContainer: {
    paddingVertical: 40,
  },
  cardContainer: {
    borderRadius: 20,
    marginVertical: 20,
    padding: 16,
    justifyContent: "center",
    overflow: "hidden",
  },
  section2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  editStyle: {
    alignSelf: "flex-end",
  },
  editTextStyle: {
    textDecorationLine: "underline",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
