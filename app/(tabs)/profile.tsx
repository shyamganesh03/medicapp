import ProfilePic from "@/components/ui/ProfilePic";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ProfileModule } from "@/constants/app-text-data";
import {
  profileMenuItems,
  ProfileMenuItemsProps,
} from "@/constants/profile-menu-items";
import useProfileActions from "@/hooks/useProfileActions";
import { useUserStore } from "@/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
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
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        disabled={item?.isComingSoon}
        style={{ opacity: item?.isComingSoon ? 0.5 : 1 }}
      >
        <Surface
          style={{
            flexDirection: "row",
            padding: 20,
            alignItems: "center",
            gap: 16,
            borderRadius: 16,
            justifyContent: "space-between",
          }}
          mode="flat"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <MaterialIcons
              name={item?.icon_name}
              size={24}
              color={colors.secondary}
            />
            <Text variant="labelLarge">{item?.title}</Text>
          </View>
          {item?.isComingSoon && (
            <Text variant="bodySmall">{ProfileModule?.COMING_SOON}</Text>
          )}
        </Surface>
      </TouchableOpacity>
    );
};

export default function Profile() {
  const userDetails = useUserStore((state: any) => state.userDetails);
  const { colors } = useTheme();
  const [canShowQRScanner, setCanShowQrScanner] = useState(false);
  const { handleProfileOptions } = useProfileActions();

  const router = useRouter();

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <Surface
            mode="flat"
            style={{
              paddingTop: 60,
              backgroundColor: "transparent",
            }}
          >
            <Surface
              mode="flat"
              style={{
                flexDirection: "row",
                gap: 16,
                marginBottom: 16,
                backgroundColor: "transparent",
              }}
            >
              <ProfilePic userDetails={userDetails} />
              <Surface
                mode="flat"
                style={{
                  gap: 8,
                  maxWidth: "60%",
                  backgroundColor: "transparent",
                }}
              >
                {userDetails.full_name && (
                  <Text variant="titleLarge">{userDetails.full_name}</Text>
                )}
                {userDetails.contact_number && (
                  <Text variant="bodySmall">{userDetails.contact_number}</Text>
                )}
                {userDetails.email && (
                  <Text variant="bodySmall">{userDetails.email}</Text>
                )}
              </Surface>
              {/* <TouchableOpacity onPress={() => router.push("/qr-code-screen")}>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={24}
                  color={colors.secondary}
                />
              </TouchableOpacity> */}
            </Surface>
          </Surface>
        }
        data={profileMenuItems}
        keyExtractor={(_, index) => `profile-edit-${index}`}
        renderItem={(extractedData) =>
          renderItem({
            ...extractedData,
            colors,
            handleSelect: handleProfileOptions,
          })
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          gap: 16,
          backgroundColor: colors.background,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
