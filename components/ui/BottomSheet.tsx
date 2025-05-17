import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

const BNSheet = ({
  onDismiss = ()=>{},
  children,
  canShowHandle = true,
  hasPadding = true,
}: any) => {
  const { colors } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // This will trigger the bottom sheet
  useEffect(() => {
    if (!!bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    }
  }, [bottomSheetModalRef]);

  return (
    <GestureHandlerRootView style={[styles.container]}>
      <Pressable
        style={[
          Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop,
        ]}
        onPress={onDismiss}
      />
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onDismiss={onDismiss}
          enableHandlePanningGesture={canShowHandle}
          handleStyle={{ display: canShowHandle ? "flex" : "none" }}
          enableContentPanningGesture={canShowHandle}
          enablePanDownToClose
          enableDynamicSizing
        >
          <BottomSheetView
            style={[
              styles.contentContainer,
              { paddingHorizontal: hasPadding ? 10 : 0, paddingVertical: 16 },
            ]}
          >
            {children}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.6,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  androidBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.4,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },
});

export default BNSheet;
