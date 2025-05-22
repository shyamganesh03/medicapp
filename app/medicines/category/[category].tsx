import MedicineCard from "@/components/ui/MedicineCard";
import useFireBase from "@/hooks/useFirebase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const CategoryHorizontalScroll = ({
  isFetching,
  data,
  category,
  handlePress = () => {},
}: {
  isFetching: boolean;
  data: any[];
  category: string | string[];
  handlePress: any;
}) => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <FlatList
      data={isFetching ? [0, 1, 2, 3, 4, 5] : data}
      keyExtractor={(item: any) => item?.id || item}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (!isFetching) {
              handlePress(item?.name);
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
                  item?.name === category
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
                    item?.name === category
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
  const { category } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | string[]
  >(category);
  const { colors } = useTheme();
  const router = useRouter();
  const {
    categoryList,
    isFetchingCategoryList,
    isFetchingMedicinesList,
    medicinesList,
    getMedicinesCategoriesList,
    getMedicinesListByCategory,
  } = useFireBase();
  //   console.log("medicinesList", medicinesList);
  useEffect(() => {
    getMedicinesCategoriesList({});
  }, []);

  useEffect(() => {
    getMedicinesListByCategory(selectedCategory);
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
          category={selectedCategory}
          handlePress={(categoryName: string) => {
            setSelectedCategory(categoryName);
          }}
        />
        {isFetchingMedicinesList ? (
          <FlatList
            data={[0, 1, 2, 3, 4, 5, 6, 7]}
            keyExtractor={(item: any) => item?.unique_id}
            renderItem={({ item }) => (
              <MedicineCard item={item} handleOnPress={() => {}} isFetching />
            )}
            contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={
              isFetchingMedicinesList ? [0, 1, 2, 3, 4, 5, 6, 7] : medicinesList
            }
            keyExtractor={(item: any) => item?.unique_id}
            renderItem={({ item }) => (
              <MedicineCard
                item={item}
                handleOnPress={() =>
                  // @ts-ignore
                  router.push(`/medicines/${item?.unique_id}`)
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
