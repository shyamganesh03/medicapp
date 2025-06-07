import { HomeModule } from "@/constants/app-text-data";
import useProducts from "@/hooks/useProducts";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const RenderCategoryItem = ({
  item,
  colors,
  width,
  handlePress = () => {},
}: {
  item: any;
  colors: MD3Colors;
  width: number;
  handlePress: any;
}) => {
  return (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Surface
        style={{
          alignItems: "center",
          borderRadius: 16,
          justifyContent: "center",
          marginVertical: 8,
          padding: 20,
          width: width / 2 - 32,
          backgroundColor: colors.primary,
          flex: 1,
          minHeight: 100,
        }}
        mode="flat"
      >
        <Text variant="bodyLarge" style={{ color: colors.onPrimary }}>
          {item?.name}
        </Text>
      </Surface>
    </TouchableOpacity>
  );
};

const RenderCategoryItemSkeleton = ({
  width,
  colors,
}: {
  width: number;
  colors: MD3Colors;
}) => {
  return (
    <SkeletonPlaceholder
      highlightColor={colors.onPrimaryContainer}
      backgroundColor={colors.primaryContainer}
    >
      <SkeletonPlaceholder.Item
        width={width / 2 - 32}
        height={100}
        borderRadius={16}
        marginVertical={8}
      />
    </SkeletonPlaceholder>
  );
};

export default function HomeScreen() {
  const { height, width } = Dimensions.get("screen");
  const { categoryList, isFetchingCategoryList, getMedicinesCategoriesList } =
    useProducts();
  const [isRefresh, setIsRefresh] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    categoryList?.length === 0 && getMedicinesCategoriesList({ limit: 4 });
  }, []);

  const onRefresh = async () => {
    setIsRefresh(true);
    await getMedicinesCategoriesList({ limit: 4 });
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
        <Surface
          style={{
            gap: 10,
            paddingVertical: 60,
            paddingHorizontal: 16,
            backgroundColor: colors.background,
          }}
          mode="flat"
        >
          {/* <View>
            <SearchTextInput placeholder={HomeModule.SEARCH_BAR_LABEL} />
          </View> */}
          <View style={{ flex: 1, gap: 16, marginVertical: 16 }}>
            <Text variant="titleLarge">
              {HomeModule.SECTION_TITLES.TOP_CATEGORIES}
            </Text>
            {isFetchingCategoryList ? (
              <FlatList
                data={[0, 1, 2, 3]}
                renderItem={() => (
                  <RenderCategoryItemSkeleton width={width} colors={colors} />
                )}
                keyExtractor={(item) => `SK-category-${item?.toString()}`}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                }}
              />
            ) : (
              <FlatList
                data={categoryList}
                renderItem={({ item }) => (
                  <RenderCategoryItem
                    item={item}
                    colors={colors}
                    width={width}
                    handlePress={() => {
                      router.push(`/medicines/category/${item?.id}`);
                    }}
                  />
                )}
                keyExtractor={(item) => item?.id}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </Surface>
      </ScrollView>
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}
