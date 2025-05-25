import ImageComponent from "@/components/ui/ImageComponent";
import { MedicineModule } from "@/constants/app-text-data";
import useFireBase from "@/hooks/useFirebase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const ProductDescription = ({ description }: { description: string }) => {
  const [cansShowMore, setCanShowMore] = React.useState(false);
  const { colors } = useTheme();

  return (
    <View style={{ gap: 4 }}>
      <Text variant="bodyLarge" numberOfLines={!cansShowMore ? 4 : 0}>
        {description || "-"}
      </Text>
      {description?.length > 172 && (
        <TouchableOpacity onPress={() => setCanShowMore(!cansShowMore)}>
          <Text
            variant="bodyLarge"
            numberOfLines={4}
            style={{
              textDecorationLine: "underline",
              color: colors.primary,
            }}
          >
            {cansShowMore ? MedicineModule.READ_LESS : MedicineModule.READ_MORE}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const { colors } = useTheme();
  const { isFetchingMedicinesList, medicinesDetails, getMedicineDetails } =
    useFireBase();

  const router = useRouter();
  const description = `Pain relievers are medicines that reduce or relieve headaches, sore muscles, arthritis, or other aches and pains. There are many different pain medicines, and each with advantages and risks. Some types of pain respond better to certain medicines than others. Each person may also have a slightly different response to a pain reliever. Pain relievers are medicines that reduce or relieve headaches, sore muscles, arthritis, or other aches and pains. There are many different pain medicines, and each with advantages and risks. Some types of pain respond better to certain medicines than others. Each person may also have a slightly different response to a pain reliever.  Pain relievers are medicines that reduce or relieve headaches, sore muscles, arthritis, or other aches and pains. There are many different pain medicines, and each with advantages and risks. Some types of pain respond better to certain medicines than others. Each person may also have a slightly different response to a pain reliever. Pain relievers are medicines that reduce or relieve headaches, sore muscles, arthritis, or other aches and pains. There are many different pain medicines, and each with advantages and risks. Some types of pain respond better to certain medicines than others. Each person may also have a slightly different response to a pain reliever.`;

  useEffect(() => {
    if (id) {
      getMedicineDetails(id as string);
    }
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 60,
          paddingHorizontal: 16,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={colors.onPrimaryContainer}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              {medicinesDetails?.medicine_name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 16,
          }}
        >
          <ImageComponent
            src={{ uri: medicinesDetails?.imageURL }}
            imageStyle={{
              height: 200,
              width: 200,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <View style={{ gap: 8 }}>
            <Text variant="labelLarge">
              {MedicineModule.DETAILS_SCREEN.COST}
            </Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <MaterialIcons
                name="currency-rupee"
                size={18}
                color={colors.onPrimaryContainer}
              />
              <Text variant="bodyLarge">{medicinesDetails?.cost || "-"}</Text>
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Text variant="labelLarge">
              {MedicineModule.DETAILS_SCREEN.AVAILABLE_STOCK}
            </Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <MaterialIcons
                name="warehouse"
                size={18}
                color={colors.onPrimaryContainer}
              />
              <Text variant="bodyLarge">
                {medicinesDetails?.total_avail_stock_count || "-"}
              </Text>
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Text variant="labelLarge">
              {MedicineModule.DETAILS_SCREEN.RATINGS}
            </Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <MaterialIcons
                name="star-rate"
                size={18}
                color={colors.onPrimaryContainer}
              />
              <Text variant="bodyLarge">
                {medicinesDetails?.ratings || "-"}
              </Text>
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Text variant="labelLarge">
              {MedicineModule.DETAILS_SCREEN.RATINGS}
            </Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <MaterialIcons
                name="factory"
                size={18}
                color={colors.onPrimaryContainer}
              />
              <Text variant="bodyLarge">
                {medicinesDetails?.manufacturing_company_details || "-"}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 8, marginTop: 16 }}>
          <Text variant="labelLarge">
            {MedicineModule.DETAILS_SCREEN.ABOUT}
          </Text>
          <ProductDescription description={description} />
        </View>
        <View
          style={{
            marginVertical: 16,
            gap: 16,
            flexDirection: "column-reverse",
            flex: 1,
          }}
        >
          <Button mode="outlined">{MedicineModule.ADD_TO_CART}</Button>
          <Button mode="contained">{MedicineModule.ADD_CTA}</Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;
