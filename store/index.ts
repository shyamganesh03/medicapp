// store.ts
import { defaultCountry, defaultUserDetails } from "@/constants/default-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICountryName } from "react-native-international-phone-number/lib/interfaces/countryName";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// @ts-ignore
import { countries } from "react-native-international-phone-number/lib/constants/countries";

type CountryType = {
  callingCode: string;
  cca2: string;
  flag: string;
  name: ICountryName;
  phoneMasks?: string[];
};

type AddressFieldType = {
  user_id?: string;
  type: string;
  house_no: string;
  address_line_1: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
};

export type UserDetails = {
  city: string;
  country: CountryType;
  email: string;
  full_name: string;
  id: string;
  is_active: boolean;
  is_admin: boolean;
  is_email_verified: boolean;
  is_phone_number_verified: boolean;
  phone_number: string;
  profile_pic: string;
  role: string;
  shop_name: string;
  address?: AddressFieldType;
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

const getFormattedUserDetails = (userData: any) => {
  const country = countries?.find(
    (countryItem: any) => countryItem?.callingCode === userData?.calling_code
  );
  const newUserDetails = {
    ...userData,
    country: country || defaultCountry,
  };
  return newUserDetails;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userDetails: defaultUserDetails,
      updateZustandUserDetailsField: (fieldName, value) => {
        console.log("fi  -> ", fieldName, value);
        return set((state) => ({
          userDetails: {
            ...state.userDetails,
            [fieldName]: value,
          },
        }));
      },
      updateZustandUserDetails: (userData: any) => {
        const newUserDetails = getFormattedUserDetails(userData);

        console.log("newUserDetails: ", newUserDetails);
        return set(() => ({
          userDetails: newUserDetails,
        }));
      },

      createNewZustandUser: (userDetails: any) => {
        const newUserDetails = getFormattedUserDetails(userDetails);
        return set(() => ({
          userDetails: newUserDetails,
        }));
      },
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
