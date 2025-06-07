import { MedicineModule } from "@/constants/app-text-data";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ImageComponent from "./ImageComponent";

const ProductCard = ({
  isFetching = false,
  item,
  handleOnPress = () => {},
}: {
  isFetching: boolean;
  item: any;
  handleOnPress: any;
}) => {
  const { colors } = useTheme();
  if (isFetching) {
    return (
      <SkeletonPlaceholder
        highlightColor={colors.onPrimaryContainer}
        backgroundColor={colors.primaryContainer}
      >
        <SkeletonPlaceholder.Item width="100%" height={100} borderRadius={8} />
      </SkeletonPlaceholder>
    );
  } else
    return (
      <Pressable onPress={() => handleOnPress()}>
        <Surface
          style={[
            styles.container,
            {
              backgroundColor: colors.surfaceVariant,
            },
          ]}
          mode="flat"
        >
          <ImageComponent src={{ uri: item?.imageURL }} />
          <View style={styles.section_container_2}>
            <Text
              variant="bodyLarge"
              style={{ color: colors.onSurfaceVariant }}
            >
              {item?.product_name}
            </Text>
            <View style={styles.detailContentContainer}>
              <View style={styles.detailContentItem}>
                <MaterialIcons
                  name="currency-rupee"
                  size={16}
                  color={colors.onPrimaryContainer}
                />
                <Text>{item?.price}</Text>
              </View>
              <View style={styles.detailContentItem}>
                <MaterialIcons
                  name="warehouse"
                  size={16}
                  color={colors.onPrimaryContainer}
                />
                <Text>{item?.available_stock}</Text>
              </View>
              {/* <View style={styles.detailContentItem}>
                <MaterialIcons
                  name="star-rate"
                  size={16}
                  color={colors.onPrimaryContainer}
                />
                <Text>{item?.ratings}</Text>
              </View> */}
            </View>
            <Button
              mode="contained"
              onPress={() => {
                console.log("object");
              }}
              // disabled={canDisableCTA}
              // loading={isProcessing}
              style={{ alignSelf: "baseline" }}
            >
              {MedicineModule?.ADD_CTA}
            </Button>
          </View>
        </Surface>
      </Pressable>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    gap: 16,
  },
  section_container_2: {
    justifyContent: "space-between",
  },
  detailContentContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
    width: "95%",
    marginVertical: 8,
  },
  detailContentItem: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});

export default ProductCard;
