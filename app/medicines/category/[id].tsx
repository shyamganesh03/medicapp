import ProductCard from "@/components/ui/ProductCard";
import useProducts from "@/hooks/useProducts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const CategoryHorizontalScroll = ({
  isFetching,
  data,
  category_id,
  handlePress = () => {},
}: {
  isFetching: boolean;
  data: any[];
  category_id: string;
  handlePress: any;
}) => {
  const { colors } = useTheme();
  const categoryListRef: React.Ref<FlatList<any>> = useRef(null);

  useEffect(() => {
    if (categoryListRef.current && !isFetching && data?.length > 1) {
      const selectedItemIndex = data.findIndex(
        (item) => item?.id === category_id
      );
      if (selectedItemIndex >= 0) {
        categoryListRef.current.scrollToIndex({
          index: selectedItemIndex,
          animated: true,
        });
      }
    }
  }, [category_id, isFetching, data]);

  return (
    <FlatList
      data={isFetching ? [0, 1, 2, 3, 4, 5] : data}
      keyExtractor={(item: any) => item?.id}
      horizontal
      ref={categoryListRef}
      onScrollToIndexFailed={(info) => {
        setTimeout(() => {
          categoryListRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
          });
        }, 100);
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (!isFetching) {
              handlePress(item);
            }
          }}
        >
          {isFetching ? (
            <SkeletonPlaceholder
              highlightColor={colors.onPrimaryContainer}
              backgroundColor={colors.primaryContainer}
            >
              <View
                style={{
                  padding: 8,
                  borderRadius: 8,
                  width: 50,
                  height: 20,
                }}
              />
            </SkeletonPlaceholder>
          ) : (
            <View
              style={{
                backgroundColor:
                  item?.id === category_id
                    ? colors.primary
                    : colors.primaryContainer,
                padding: 8,
                borderRadius: 8,
                minWidth: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  color:
                    item?.id === category_id
                      ? colors.onPrimary
                      : colors.onPrimaryContainer,
                }}
              >
                {item?.name}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      contentContainerStyle={{
        flexDirection: "row",
        marginVertical: 16,
        gap: 16,
        minHeight: 40,
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const MedicineCategoryScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = React.useState<any>({
    id: id,
  });
  const { colors } = useTheme();
  const router = useRouter();
  const {
    categoryList,
    isFetchingCategoryList,
    isFetchingMedicinesList,
    productList,
    getMedicinesCategoriesList,
    getProductsByCategoryId,
  } = useProducts();

  useEffect(() => {
    getMedicinesCategoriesList({});
  }, []);

  useEffect(() => {
    getProductsByCategoryId(selectedCategory?.id);
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Surface
        style={{
          flex: 1,
          paddingTop: 60,
          paddingHorizontal: 16,
          backgroundColor: colors.background,
        }}
        mode="flat"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={colors.onPrimaryContainer}
          />
        </TouchableOpacity>

        <CategoryHorizontalScroll
          data={[{ id: "01", name: "All" }, ...categoryList]}
          isFetching={isFetchingCategoryList}
          category_id={selectedCategory?.id}
          handlePress={(selectedItem: any) => {
            setSelectedCategory(selectedItem);
          }}
        />
        {isFetchingMedicinesList ? (
          <FlatList
            data={[0, 1, 2, 3, 4, 5, 6, 7]}
            keyExtractor={(item: any) => item?.unique_id}
            renderItem={({ item }) => (
              <ProductCard item={item} handleOnPress={() => {}} isFetching />
            )}
            contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={productList}
            keyExtractor={(item: any) => item?.product_id}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                handleOnPress={() =>
                  // @ts-ignore
                  router.push(`/medicines/${item?.product_id}`)
                }
                isFetching={isFetchingCategoryList}
              />
            )}
            contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Surface>
    </View>
  );
};

export default MedicineCategoryScreen;
