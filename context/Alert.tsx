import { AlertModule } from "@/constants/app-text-data";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { createContext, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Text, useTheme } from "react-native-paper";

type AlertContextType = {
  isVisible: boolean;
  showAlert: any;
};

type AlertPropsType = {
  type: string;
  title: string | undefined;
  description: string | undefined;
  primaryCTAText: string | undefined;
  handlePrimaryCTA: any;
};

const AlertContext = createContext<AlertContextType>({
  isVisible: false,
  showAlert: undefined,
});

const AlertContextProvider = ({ children }: { children: any }) => {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [alertBoxData, setAlertBoxData] = useState<AlertPropsType>({
    type: "info",
    title: "Grant permission",
    description: "Allow medic to access your camera",
    primaryCTAText: AlertModule.OPEN_SETTINGS,
    handlePrimaryCTA: () => {},
  });

  const showAlert = useCallback(
    ({
      type,
      title,
      description,
      primaryCTAText,
      handlePrimaryCTA,
    }: AlertPropsType) => {
      setAlertBoxData({
        type,
        title,
        description,
        primaryCTAText,
        handlePrimaryCTA,
      });
      setIsVisible(true);
    },
    []
  );

  const iconDetails: any = useMemo(() => {
    if (alertBoxData.type === "info") {
      return { name: "info", color: colors.primary };
    } else if (alertBoxData.type === "error") {
      return { name: "error", color: colors.onError };
    } else {
      return { name: "info", color: colors.onPrimary };
    }
  }, [alertBoxData.type]);

  return (
    <AlertContext.Provider value={{ isVisible, showAlert }}>
      {children}
      <Modal visible={isVisible} onDismiss={() => setIsVisible(false)}>
        <View style={[styles.container, { backgroundColor: colors.backdrop }]}>
          <View
            style={[
              styles.contentContainer,
              { backgroundColor: colors.surface },
            ]}
          >
            <MaterialIcons
              name={iconDetails.name}
              size={24}
              color={iconDetails.color}
            />
            <Text variant="labelLarge">{alertBoxData.title}</Text>
            <Text>{alertBoxData.description}</Text>
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={() => setIsVisible(false)}>
                {alertBoxData.primaryCTAText}
              </Button>
              <Button mode="outlined" onPress={alertBoxData.handlePrimaryCTA}>
                {AlertModule.CANCEL_CTA}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  contentContainer: {
    padding: 20,
    borderRadius: 10,
    gap: 12,
    alignItems: "center",
  },
  buttonContainer: {
    gap: 8,
    flexDirection: "row",
  },
});

export { AlertContext, AlertContextProvider };
