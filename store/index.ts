// store.ts
import { defaultUserDetails } from "@/constants/default-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICountryName } from "react-native-international-phone-number/lib/interfaces/countryName";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CountryType = {
  callingCode: string;
  cca2: string;
  flag: string;
  name: ICountryName;
  phoneMasks?: string[];
};

export type UserDetails = {
  address_type: string;
  city: string;
  country: CountryType;
  email: string;
  full_name: string;
  house_no: string;
  id: string;
  is_active: boolean;
  is_admin: boolean;
  is_email_verified: boolean;
  is_phone_number_verified: boolean;
  phone_number: string;
  profile_pic: string;
  role: string;
  shop_name: string;
  street_name: string;
};

type UserStore = {
  userDetails: UserDetails;
  updateZustandUserDetailsField: (
    fieldName: keyof UserDetails,
    value: string
  ) => void;
  updateZustandUserDetails: (value: UserDetails) => void;
  createNewZustandUser: (userDetails: any) => void;
};

type ThemeStore = {
  theme: "Light" | "Dark";
  updateTheme: (isDarkTheme: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userDetails: defaultUserDetails,
      updateZustandUserDetailsField: (fieldName, value) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            [fieldName]: value,
          },
        })),
      updateZustandUserDetails: (value: any) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            ...value,
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
