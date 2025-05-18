// store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserDetails = {
  contact_number: string;
  email: string;
  full_name: string;
  gender: string;
  home_address: string;
  profile_pic: string;
  qrCode: string;
  uid: string;
};

type UserStore = {
  userDetails: UserDetails;
  updateUserZustandDetails: (
    fieldName: keyof UserDetails,
    value: string
  ) => void;
  createNewZustandUser: (userDetails: any) => void;
};

type ThemeStore = {
  theme: "Light" | "Dark";
  updateTheme: (isDarkTheme: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userDetails: {
        contact_number: "",
        email: "",
        full_name: "",
        gender: "",
        home_address: "",
        profile_pic: "",
        qrCode: "",
        uid:"",
      },
      updateUserZustandDetails: (fieldName, value) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            [fieldName]: value,
          },
        })),
      createNewZustandUser: (userDetails: any) =>
        set((state) => ({
          userDetails,
        })),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "Light",
      updateTheme: (isDarkTheme: boolean) =>
        set({ theme: !isDarkTheme ? "Dark" : "Light" }),
    }),
    {
      name: "app-theme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
