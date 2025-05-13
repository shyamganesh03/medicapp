import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  profileMenuItems,
  ProfileMenuItemsProps,
} from "@/constants/profile-menu-items";
import useProfileActions from "@/hooks/useProfileActions";
import { useUserStore } from "@/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

const renderItem = ({
  item,
  colors,
  handleSelect,
}: {
  item: ProfileMenuItemsProps;
  index: number;
  colors: MD3Colors;
  handleSelect: any;
}) => {
  if (item.type === "theme-toggle") return <ThemeToggle />;
  else
    return (
      <TouchableOpacity onPress={() => handleSelect(item)}>
        <Surface
          style={{
            flexDirection: "row",
            padding: 20,
            alignItems: "center",
            gap: 16,
            borderRadius: 16,
            backgroundColor: colors.background,
          }}
          mode="flat"
        >
          <MaterialIcons
            name={item?.icon_name}
            size={24}
            color={colors.secondary}
          />
          <Text variant="labelLarge">{item?.title}</Text>
        </Surface>
      </TouchableOpacity>
    );
};

export default function Profile() {
  const { height, width } = Dimensions.get("screen");
  const userDetails = useUserStore((state: any) => state.userDetails);
  const { colors } = useTheme();
  const { handleProfileOptions } = useProfileActions();

  return (
    <Surface
      mode="flat"
      style={{ paddingVertical: 60, paddingHorizontal: 16, height, width }}
    >
      <Surface
        mode="flat"
        style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}
      >
        {userDetails?.profile_pic ? (
          <Surface
            style={{
              backgroundColor: "white",
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
            mode="flat"
          >
            <Avatar.Image
              size={80}
              source={{ uri: userDetails?.profile_pic }}
            />
          </Surface>
        ) : (
          <Surface
            style={{
              backgroundColor: "white",
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
            mode="flat"
          >
            <MaterialIcons
              name="account-circle"
              size={80}
              color={colors.primaryContainer}
            />
          </Surface>
        )}
        <Surface mode="flat" style={{ gap: 8, maxWidth: "70%" }}>
          <Text variant="titleLarge">{userDetails?.full_name}</Text>
          <Text variant="bodySmall">{userDetails?.contact_number}</Text>
          <Text variant="bodySmall">{userDetails?.email}</Text>
        </Surface>
      </Surface>

      <FlatList
        data={profileMenuItems}
        keyExtractor={(_, index) => `profile-edit-${index}`}
        renderItem={(extractedData) =>
          renderItem({
            ...extractedData,
            colors,
            handleSelect: handleProfileOptions,
          })
        }
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </Surface>
  );
}
