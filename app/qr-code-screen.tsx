import BNSheet from "@/components/ui/BottomSheet";
import usePermission from "@/hooks/usePermission";
import { useUserStore } from "@/store";
import { copyStringToClipBoard } from "@/utils/helperFn";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import * as React from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import Toast from "react-native-toast-message";

type BottomSheetDataTypes = {
  EMAIL?: string | undefined;
  CONTACT_NUMBER?: string | undefined;
  FULL_NAME?: string | undefined;
};

type BottomSheetMetaDataTypes = {
  canShow: boolean;
  data: BottomSheetDataTypes;
};

const handleCopyText = async (text: string | undefined) => {
  const response = await copyStringToClipBoard(text || "");
  if (response) {
    Toast.show({
      type: "success",
      text2: "Your text has copied successfully!",
    });
  }
};

const RenderBottomSheetItem = ({
  iconName,
  value = "",
}: {
  iconName: any;
  value: string | undefined;
}) => {
  const { colors } = useTheme();

  return (
    <Surface
      style={{
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        gap: 16,
        borderRadius: 16,
      }}
      mode="flat"
    >
      <MaterialIcons
        name={iconName}
        size={24}
        color={colors.primary}
        style={{ marginRight: 8 }}
      />
      <Text
        variant="bodyLarge"
        style={{
          color: colors.onSecondary,
          maxWidth: "85%",
        }}
        numberOfLines={2}
      >
        {value}
      </Text>
      <Pressable onPress={() => handleCopyText(value)}>
        <MaterialIcons name="content-copy" size={24} color={colors.onPrimary} />
      </Pressable>
    </Surface>
  );
};

const QrCodeBottomSheet = ({
  isVisible,
  data,
  onDismiss,
}: {
  isVisible: boolean;
  data: BottomSheetDataTypes;
  onDismiss: any;
}) => {
  if (isVisible)
    return (
      <BNSheet height={""} onDismiss={onDismiss}>
        <RenderBottomSheetItem iconName="person" value={data.FULL_NAME} />
        <RenderBottomSheetItem iconName="mail" value={data.EMAIL} />
        <RenderBottomSheetItem iconName="call" value={data.CONTACT_NUMBER} />
      </BNSheet>
    );
  else return <></>;
};

const QRScreen = () => {
  const initialBottomSheetData = {
    canShow: false,
    data: {
      EMAIL: "",
      CONTACT_NUMBER: "",
      FULL_NAME: "",
    },
  };
  const { height, width } = Dimensions.get("screen");
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);
  const [canScan, setCanScan] = React.useState(true);
  const [bottomSheetMetaData, setBottomSheetMetaData] =
    React.useState<BottomSheetMetaDataTypes>(initialBottomSheetData);
  const userDetails = useUserStore((state) => state.userDetails);
  const { checkCameraPermission } = usePermission();
  const router = useRouter();

  React.useEffect(() => {
    checkCameraPermission();
  }, []);

  const handleReadQR = (qrData: BarcodeScanningResult) => {
    const valuedQrRegex =
      /CONTACT_NUMBER:(\d{10})\|EMAIL:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|FULL_NAME:[a-zA-Z]+ [a-zA-Z]+/;
    const data = qrData?.data || "";
    console.log("data --> ", qrData, valuedQrRegex.test(data));
    if (valuedQrRegex.test(data)) {
      const splittedData = data?.split("|");
      let jsonData: BottomSheetDataTypes = {};
      splittedData?.forEach((item) => {
        const separatedTextIndex = item?.lastIndexOf(":");
        const key = item?.slice(0, separatedTextIndex);
        const value = item?.slice(separatedTextIndex + 1);
        jsonData = { ...jsonData, [key]: value };
      });
      setCanScan(false);
      setBottomSheetMetaData({ canShow: true, data: jsonData });
    }
  };

  return (
    <View
      style={{
        height,
        width,
        paddingVertical: 60,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={colors.onBackground}
          />
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {activeTab === 0 ? (
          <QRCode value={userDetails.qrCode} size={250} />
        ) : (
          <CameraView
            onBarcodeScanned={(data) => {
              if (canScan) handleReadQR(data);
            }}
            style={{ width: "80%", height: "80%" }}
          />
        )}
      </View>
      <View style={{ flexDirection: "row", gap: 34, justifyContent: "center" }}>
        <Pressable onPress={() => setActiveTab(0)}>
          <MaterialIcons
            name="qr-code"
            size={40}
            color={activeTab === 0 ? colors.primary : colors.secondary}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setActiveTab(1);
          }}
        >
          <MaterialIcons
            name="qr-code-scanner"
            size={40}
            color={activeTab === 1 ? colors.primary : colors.secondary}
          />
        </Pressable>
      </View>
      <QrCodeBottomSheet
        isVisible={bottomSheetMetaData.canShow}
        data={bottomSheetMetaData.data}
        onDismiss={() => {
          setBottomSheetMetaData(initialBottomSheetData);
          setCanScan(true);
        }}
      />
    </View>
  );
};

export default QRScreen;
