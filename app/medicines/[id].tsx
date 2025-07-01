import ImageComponent from "@/components/ui/ImageComponent";
import { MedicineModule } from "@/constants/app-text-data";
import useProducts from "@/hooks/useProducts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

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
  const { isFetchingProduct, product, getProductDetails } = useProducts();

  const router = useRouter();

  useEffect(() => {
    if (id && product?.length === 0) {
      getProductDetails(id as string);
    }
  }, [id]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 60,
        paddingHorizontal: 16,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={colors.onPrimaryContainer}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {isFetchingProduct ? (
            <SkeletonPlaceholder
              highlightColor={colors.onPrimaryContainer}
              backgroundColor={colors.primaryContainer}
            >
              <View
                style={{
                  width: 200,
                  height: 20,
                  alignSelf: "center",
                }}
              />
            </SkeletonPlaceholder>
          ) : (
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              {product?.product_name}
            </Text>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {isFetchingProduct ? (
              <SkeletonPlaceholder
                highlightColor={colors.onPrimaryContainer}
                backgroundColor={colors.primaryContainer}
              >
                <View
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                />
              </SkeletonPlaceholder>
            ) : (
              <ImageComponent
                src={{ uri: product?.imageURL }}
                imageStyle={{
                  height: 200,
                  width: 200,
                }}
              />
            )}
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.contentItem}>
              {isFetchingProduct ? (
                <SkeletonPlaceholder
                  highlightColor={colors.onPrimaryContainer}
                  backgroundColor={colors.primaryContainer}
                >
                  <View style={styles.skeletonItem} />
                </SkeletonPlaceholder>
              ) : (
                <>
                  <Text variant="labelLarge">
                    {MedicineModule.DETAILS_SCREEN.COST}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="currency-rupee"
                      size={18}
                      color={colors.onPrimaryContainer}
                    />
                    <Text variant="bodyLarge">{product?.price || "-"}</Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.contentItem}>
              {isFetchingProduct ? (
                <SkeletonPlaceholder
                  highlightColor={colors.onPrimaryContainer}
                  backgroundColor={colors.primaryContainer}
                >
                  <View style={styles.skeletonItem} />
                </SkeletonPlaceholder>
              ) : (
                <>
                  <Text variant="labelLarge">
                    {MedicineModule.DETAILS_SCREEN.AVAILABLE_STOCK}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="warehouse"
                      size={18}
                      color={colors.onPrimaryContainer}
                    />
                    <Text variant="bodyLarge">
                      {product?.available_stock || "-"}
                    </Text>
                  </View>
                </>
              )}
            </View>
            {/* <View style={styles.contentItem}>
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
              <Text variant="bodyLarge">{product?.ratings || "-"}</Text>
            </View>
          </View> */}
            {/* <View style={styles.contentItem}>
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
                {product?.manufacturing_company_details || "-"}
              </Text>
            </View>
          </View> */}
          </View>
          <View style={[{ marginTop: 16 }, styles.contentItem]}>
            {isFetchingProduct ? (
              <SkeletonPlaceholder
                highlightColor={colors.onPrimaryContainer}
                backgroundColor={colors.primaryContainer}
              >
                <View style={{ height: 100, width: "100%" }} />
              </SkeletonPlaceholder>
            ) : (
              <>
                <Text variant="labelLarge">
                  {MedicineModule.DETAILS_SCREEN.ABOUT}
                </Text>
                <ProductDescription description={product?.description} />
              </>
            )}
          </View>
          <View style={styles.ctaContainer}>
            <Button
              mode="contained"
              onPress={() => {
                router.push({
                  pathname: "/product_buy",
                  params: {
                    productDetails: JSON.stringify({ ...product, quantity: 1 }),
                  },
                });
              }}
            >
              {MedicineModule.BUY_CTA}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 16 },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  contentItem: {
    gap: 8,
  },
  ctaContainer: {
    marginVertical: 16,
    gap: 16,
    flexDirection: "column-reverse",
    flex: 1,
  },
  skeletonItem: {
    height: 50,
    width: 100,
  },
});

export default ProductDetailsScreen;
